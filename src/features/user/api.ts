import { cache } from "react";

import type { User } from "@/features/auth/types";
import { ApiError } from "@/lib/api";
import { apiServer } from "@/lib/api.server";

/**
 * Returns the current authenticated user, or `null` if the session
 * is missing / expired.
 *
 * Wrapped with React `cache()` so that multiple Server Components
 * calling `getMe()` during the same request (layout → page → nested)
 * only trigger **one** actual fetch to the backend.
 */
export const getMe = cache(async (): Promise<User | null> => {
  try {
    return await apiServer<User>("/user/me");
  } catch (err) {
    if (err instanceof ApiError && err.statusCode === 401) {
      return null;
    }
    return null;
  }
});
