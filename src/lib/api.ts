/**
 * Клиентский fetch-хелпер.
 *
 * Все запросы идут на относительный путь /api/*,
 * который nginx проксирует на backend:8080.
 * Браузер автоматически отправляет куки (credentials: 'include').
 *
 * Используется в Client Components и хуках.
 */

export class ApiError extends Error {
  constructor(
    public readonly statusCode: number,
    message: string,
  ) {
    super(message);
    this.name = 'ApiError';
  }
}
const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'localhost';

async function handleResponse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const body = await res.json().catch(() => ({}));
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/restrict-template-expressions
    throw new ApiError(res.status, body.message ?? `HTTP ${res.status}`);
  }
  return res.json() as Promise<T>;
}

export async function api<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_URL}/api${path}`, {
    ...init,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      // eslint-disable-next-line @typescript-eslint/no-misused-spread
      ...init?.headers,
    },
  });
  return handleResponse<T>(res);
}
