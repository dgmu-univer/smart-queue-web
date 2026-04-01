import { api, ApiError } from "@/lib/api";
import type { User } from "@/features/auth/types";

export async function getMe(): Promise<User | null> {
  try {
    return await api.server<User>("/user/me");
  } catch (err) {
    if (err instanceof ApiError && err.statusCode === 401) {
      return null;
    }
    return null;
  }
}
