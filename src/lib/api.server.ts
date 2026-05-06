import { getServerSession } from 'next-auth';
import { cookies } from 'next/headers';

import { authOptions } from '@/app/api/auth/[...nextauth]/route';

import { ApiError } from './api';

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

const API_URL = process.env.API_URL ?? 'http://backend:8080';

async function handleResponse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const body = await res.json().catch(() => ({}));
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/restrict-template-expressions
    throw new ApiError(res.status, body.message ?? `HTTP ${res.status}`);
  }
  return res.json() as Promise<T>;
}

/**
 * Получает SESSION куку из NextAuth сессии.
 * NextAuth хранит serverCookie внутри своего JWT токена.
 */
async function getSessionCookie(): Promise<string | null> {
  // Сначала пробуем получить из NextAuth сессии (serverCookie из JWT)
  const session = await getServerSession(authOptions);
  if (session?.serverCookie) {
    return session.serverCookie;
  }

  // Fallback: если SESSION кука всё же есть напрямую в cookies
  // (например при SSR до инициализации NextAuth)
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
  const res = await fetch(`${API_URL}/api${path}`, {
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
