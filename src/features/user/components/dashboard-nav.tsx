"use client";

import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { LogOut, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { api } from "@/lib/api";
import { CURRENT_USER_QUERY_KEY } from "@/features/user/hooks/use-current-user";
import type { User } from "@/features/auth/types";

interface DashboardNavProps {
  user: User;
}

const roleLabels: Record<User["role"], string> = {
  SUPPLIER: "Поставщик",
  STORE: "Магазин",
};

export function DashboardNav({ user }: DashboardNavProps) {
  const router = useRouter();
  const queryClient = useQueryClient();

  async function handleLogout() {
    try {
      await api.client("/auth/logout", { method: "POST" });
    } catch {
      // Even if request fails — clear local state and redirect
    } finally {
      queryClient.removeQueries({ queryKey: CURRENT_USER_QUERY_KEY });
      router.push("/login");
    }
  }

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <ShoppingBag className="h-6 w-6 text-primary" />
          <span className="text-lg font-bold tracking-tight">OptPrice</span>
        </div>

        {/* User info + logout */}
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex flex-col items-end">
            <span className="text-sm font-medium leading-none">
              {user.phone}
            </span>
            <span className="text-xs text-muted-foreground mt-0.5">
              {user.profileIsComplete
                ? "Профиль заполнен"
                : "Профиль не заполнен"}
            </span>
          </div>

          <Badge variant={user.role === "SUPPLIER" ? "default" : "secondary"}>
            {roleLabels[user.role]}
          </Badge>

          <Button
            variant="ghost"
            size="sm"
            onClick={handleLogout}
            className="gap-2 text-muted-foreground hover:text-foreground"
            aria-label="Выйти"
          >
            <LogOut className="h-4 w-4" />
            <span className="hidden sm:inline">Выйти</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
