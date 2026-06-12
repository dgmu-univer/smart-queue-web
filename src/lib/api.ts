/**
 * Клиентский fetch-хелпер.
 * Используется в Client Components и хуках.
 */

export class ApiError extends Error {
  public status: number;
  public headers: Record<string, string>;

  constructor(
    public readonly statusCode: number,
    message: string,
    headers?: Headers, // <-- добавили
  ) {
    super(message);
    this.status = statusCode;
    this.name = 'ApiError';

    // Копируем Headers в plain object, иначе нельзя будет прочитать по ключу
    this.headers = {};
    if (headers) {
      headers.forEach((value, key) => {
        this.headers[key.toLowerCase()] = value;
      });
    }
  }
}

async function handleResponse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const body = await res.json().catch(() => ({})) as Record<string, unknown>;

    throw new ApiError(
      res.status,
      typeof body.message === 'string' ? body.message : `HTTP ${res.status.toString()}`,
      res.headers, // <-- теперь передаётся в конструктор
    );
  }
  return res.json() as Promise<T>;
}

export async function api<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/backend/api${path}`, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      // eslint-disable-next-line @typescript-eslint/no-misused-spread
      ...init?.headers,
    },
  });
  return handleResponse<T>(res);
}
