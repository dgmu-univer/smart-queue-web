import { redirect } from "next/navigation";

import { CheckCircle, Clock, Package, ShoppingBag } from "lucide-react";

import type { User } from "@/features/auth/types";

const roleLabels: Record<User["role"], string> = {
  SUPPLIER: "Поставщик",
  STORE: "Магазин",
};

const roleDescriptions: Record<User["role"], string> = {
  SUPPLIER: "Управляйте своими товарами и предложениями для магазинов",
  STORE: "Находите поставщиков и закупайте товары по оптовым ценам",
};

export default async function DashboardPage() {
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
      {/* Welcome header */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Добро пожаловать!
          </h1>
          <p className="text-muted-foreground mt-1">
            {roleDescriptions[user.role]}
          </p>
        </div>
      </div>

      {/* Profile status banner */}
      {!user.profileIsComplete && (
        <div className="flex items-start gap-3 rounded-xl border border-yellow-200 bg-yellow-50 px-4 py-3 text-yellow-800">
          <Clock className="mt-0.5 h-5 w-5 shrink-0 text-yellow-600" />
          <div>
            <p className="font-medium">Заполните профиль</p>
            <p className="text-sm text-yellow-700">
              Для полного доступа ко всем функциям площадки заполните информацию
              о себе.
            </p>
          </div>
        </div>
      )}

      {user.profileIsComplete && (
        <div className="flex items-start gap-3 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-green-800">
          <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-green-600" />
          <div>
            <p className="font-medium">Профиль заполнен</p>
            <p className="text-sm text-green-700">
              Вам доступны все функции платформы.
            </p>
          </div>
        </div>
      )}

      {/* Stats cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">jhfgh</div>
    </div>
  );
}
