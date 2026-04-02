import { cookies } from "next/headers";
import { ApiError } from "./api";

const API_URL = process.env.API_URL ?? "http://127.0.0.1:4000";

async function handleResponse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new ApiError(res.status, body.message ?? `HTTP ${res.status}`);
  }
  return res.json() as Promise<T>;
}

/**
 * Server-only fetch.
 * Reads the session cookie from the incoming request via `next/headers`
 * and forwards it directly to the backend.
 *
 * Used exclusively in Server Components and Server Actions.
 * Never import this module in Client Components.
 */
export async function apiServer<T>(
  path: string,
  init?: RequestInit,
): Promise<T> {
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
