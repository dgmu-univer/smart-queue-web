import { useQuery } from "@tanstack/react-query";
import { api, ApiError } from "@/lib/api";
import type { User } from "@/features/auth/types";

export const CURRENT_USER_QUERY_KEY = ["currentUser"] as const;

export function useCurrentUser() {
  return useQuery<User, ApiError>({
    queryKey: CURRENT_USER_QUERY_KEY,
    queryFn: () => api<User>("/user/me"),
    retry: (failureCount, error) => {
      if (error instanceof ApiError && error.statusCode === 401) {
        return false;
      }
      return failureCount < 2;
    },
    staleTime: 1000 * 60 * 5,
  });
}
