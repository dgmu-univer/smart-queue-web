import { redirect } from "next/navigation";
import { getMe } from "@/features/user/api";
import type { User } from "@/features/auth/types";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShoppingBag, Package, CheckCircle, Clock } from "lucide-react";

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
    "id": 1,
    "phone": "+79991234567",
    "role": "SUPPLIER",
    "profileIsComplete": true,
    "createdAt": "2025-04-02T10:30:00.000Z",
    "updatedAt": "2025-04-02T10:30:00.000Z"
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
          <p className="mt-1 text-muted-foreground">
            {roleDescriptions[user.role]}
          </p>
        </div>
        <Badge
          variant={user.role === "SUPPLIER" ? "default" : "secondary"}
          className="w-fit text-sm px-3 py-1"
        >
          {roleLabels[user.role]}
        </Badge>
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
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Телефон
            </CardTitle>
            <ShoppingBag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-lg font-semibold tracking-wide">{user.phone}</p>
            <p className="mt-1 text-xs text-muted-foreground">
              Основной контакт
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Роль
            </CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-lg font-semibold">{roleLabels[user.role]}</p>
            <p className="mt-1 text-xs text-muted-foreground">
              Изменить роль невозможно
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Статус профиля
            </CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-lg font-semibold">
              {user.profileIsComplete ? "Заполнен" : "Не заполнен"}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              Дата регистрации:{" "}
              {new Date(user.createdAt).toLocaleDateString("ru-RU", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
