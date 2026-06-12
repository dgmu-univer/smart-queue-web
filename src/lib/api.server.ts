import { getToken } from 'next-auth/jwt';
import { cookies, headers } from 'next/headers';

import { ApiError } from './api';
import { NextApiRequest } from 'next';
import { redirect } from 'next/navigation';

type Success<T = undefined>
  = T extends undefined
    ? { success: true, data?: undefined }
    : { success: true, data: T };

interface Failure {
  success: false
  error: {
    status: number
    message: string
  }
}

export type ActionResult<T = undefined>
  = | Success<T>
    | Failure;

export type ActionPromisifyResult<T = undefined>
  = Promise<ActionResult<T>>;
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
    const body = await res.json().catch(() => ({})) as Record<string, unknown>;
    if (res.status === 403) {
      redirect('/api/auth/signout');
    }

    throw new ApiError(
      res.status,
      typeof body.message === 'string' ? body.message : `HTTP ${res.status.toString()}`,
      res.headers); // <-- теперь передаётся в конструктор);
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
