import { getToken } from 'next-auth/jwt';
import { cookies, headers } from 'next/headers';

import { ApiError } from './api';
import { NextApiRequest } from 'next';
import { redirect } from 'next/navigation';

export type ActionResult
  = | { success: true }
    | { success: false, error: { status: number, message: string } };

export type ActionPromisifyResult = Promise<ActionResult>;

/**
 * Серверный fetch-хелпер.
 *
 * Обращается к бэкенду напрямую через внутреннюю Docker-сеть (backend:8080),
 * минуя nginx. Читает SESSION куку из NextAuth сессии и пробрасывает её
 * на бэкенд.
 *
 * Используется ТОЛЬКО в Server Components и Server Actions.
 * Никогда не импортируй этот модуль в Client Components.
 */
async function handleResponse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const body = await res.json().catch(() => ({}));
    if (res.status === 403) {
      redirect('/api/auth/signout');
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      throw new ApiError(res.status, body.message ?? 'Сессия истекла. Выполняется выход...');
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/restrict-template-expressions
    throw new ApiError(res.status, body.message ?? `HTTP ${res.status}`);
  }

  // Проверяем, есть ли вообще содержимое в ответе
  const contentType = res.headers.get('content-type');

  if (contentType?.includes('application/json')) {
    return await res.json() as Promise<T>; // Безопасно парсим, если это JSON
  }

  // Если бэкенд возвращает пустой ответ при успешном обновлении
  return { success: true } as T;
}

export async function getSessionCookie(): Promise<string | null> {
  // Передаем заголовки текущего запроса, чтобы getToken смог прочитать и расшифровать NextAuth JWT
  const req = {
    headers: Object.fromEntries(await headers()),
    cookies: Object.fromEntries(
      (await cookies()).getAll().map(c => [c.name, c.value]),
    ),
  };

  // Извлекаем зашифрованный токен напрямую из кук Next-Auth
  const token = await getToken({ req: req as NextApiRequest, secret: process.env.NEXTAUTH_SECRET });

  if (token?.backendCookies) {
    return token.backendCookies;
  }

  // Fallback: если SESSION кука всё же есть напрямую в cookies
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get('SESSION');
  if (sessionCookie) {
    return `SESSION=${sessionCookie.value}`;
  }

  return null;
}

export async function apiServer<T>(
  path: string,
  init?: RequestInit,
): Promise<T> {
  const sessionCookie = await getSessionCookie();
  const res = await fetch(`${process.env.EXTERNAL_API_HOST}/api${path}`, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...(sessionCookie ? { Cookie: sessionCookie } : {}),
      // eslint-disable-next-line @typescript-eslint/no-misused-spread
      ...init?.headers,
    },
    cache: 'no-store',
  });
  return handleResponse<T>(res);
}

// Извлекает статус и сообщение из ошибки API
export function extractApiError(error: unknown) {
  // 1. Проверяем кастомные объекты со статусом (включая ApiError)
  if (error && typeof error === 'object' && 'status' in error) {
    const status = (error).status;
    const message = 'message' in error ? (error as { message: unknown }).message : undefined;

    return {
      status: typeof status === 'number' ? status : 500,
      message: typeof message === 'string' ? message : JSON.stringify(error),
    };
  }

  // 2. Стандартный класс Error
  if (error instanceof Error) {
    return {
      status: 500,
      message: error.message,
    };
  }

  // 3. Если пришла строка
  if (typeof error === 'string') {
    return { status: 500, message: error };
  }

  // 4. Если примитив (number, boolean) — их приведение к строке безопасно
  if (typeof error === 'number' || typeof error === 'boolean') {
    return { status: 500, message: error.toString() };
  }

  // 5. Если пришел объект или массив без статуса
  if (error && typeof error === 'object') {
    try {
      return { status: 500, message: JSON.stringify(error) };
    } catch {
      return { status: 500, message: 'Ошибка содержит циклические ссылки' };
    }
  }

  // 6. Для null и undefined
  return {
    status: 500,
    message: 'Неизвестная ошибка сервера',
  };
}
