import { type Metadata } from "next";
import { redirect } from "next/navigation";

import type { User } from "@/features/auth/types";

export const metadata: Metadata = {
  title: "Профиль — ДГМУ",
};

const roleLabels: Record<User["role"], string> = {
  SUPPLIER: "Поставщик",
  STORE: "Магазин",
};

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default async function ProfilePage() {
  const user = {
    id: 1,
    phone: "+79991234567",
    role: "SUPPLIER",
    profileIsComplete: true,
    createdAt: "2025-04-02T10:30:00.000Z",
    updatedAt: "2025-04-02T10:30:00.000Z",
  } as User;

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Профиль</h1>
        <p className="text-muted-foreground mt-1 text-sm">
          Информация о вашем аккаунте
        </p>
      </div>

      {/* Avatar + summary */}
      <div className="flex items-center gap-5">
        <div className="bg-primary/10 text-primary flex h-16 w-16 items-center justify-center rounded-full">
          авпваавп
        </div>
        <div className="space-y-1">
          <p className="text-lg leading-none font-semibold">{user.phone}</p>
          <div className="flex items-center gap-2">Юзер</div>
        </div>
      </div>
    </div>
  );
}
