export class ApiError extends Error {
  constructor(
    public readonly statusCode: number,
    message: string,
  ) {
    super(message)
    this.name = 'ApiError'
  }
}

async function handleResponse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const body = await res.json().catch(() => ({}))
    throw new ApiError(res.status, body.message ?? `HTTP ${res.status}`)
  }
  return res.json() as Promise<T>
}

/**
 * Client-side fetch.
 * All requests go through the Next.js rewrite proxy (`/api/*` → backend),
 * so the browser never crosses origins and cookies are sent automatically.
 *
 * Used in Client Components, hooks, and feature api modules.
 */
export async function api<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`/api${path}`, {
    ...init,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...init?.headers,
    },
  })
  return handleResponse<T>(res)
}
