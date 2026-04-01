const API_URL = process.env.API_URL ?? "http://127.0.0.1:4000";

export class ApiError extends Error {
  constructor(
    public readonly statusCode: number,
    message: string,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

async function handleResponse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new ApiError(res.status, body.message ?? `HTTP ${res.status}`);
  }
  return res.json() as Promise<T>;
}

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace api {
  /**
   * Client-side fetch.
   * All requests go through the Next.js rewrite proxy (`/api/*` → backend),
   * so the browser never crosses origins and cookies are sent automatically.
   *
   * Used in Client Components, hooks, and feature api modules.
   */
  export async function client<T>(
    path: string,
    init?: RequestInit,
  ): Promise<T> {
    const res = await fetch(`/api${path}`, {
      ...init,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        ...init?.headers,
      },
    });
    return handleResponse<T>(res);
  }

  /**
   * Server-only fetch.
   * Reads the session cookie from the incoming request via `next/headers`
   * and forwards it to the backend.
   *
   * Used in Server Components and Server Actions.
   *
   * NOTE: `next/headers` is imported dynamically so this module can safely
   * be imported in client bundles — the dynamic import is only resolved
   * at runtime when `server()` is actually called (which only happens on
   * the server).
   */
  export async function server<T>(
    path: string,
    init?: RequestInit,
  ): Promise<T> {
    const { cookies } = await import("next/headers");
    const cookieStore = await cookies();
    const cookieHeader = cookieStore
      .getAll()
      .map((c) => `${c.name}=${c.value}`)
      .join("; ");

    const res = await fetch(`${API_URL}${path}`, {
      ...init,
      headers: {
        "Content-Type": "application/json",
        ...(cookieHeader ? { Cookie: cookieHeader } : {}),
        ...init?.headers,
      },
      cache: "no-store",
    });
    return handleResponse<T>(res);
  }
}
