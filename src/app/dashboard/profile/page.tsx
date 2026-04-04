import { redirect } from "next/navigation";
import { getMe } from "@/features/user/api";
import type { User } from "@/features/auth/types";
import { Badge } from "@/components/ui/old/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/old/card";
import { User2, Phone, Calendar, ShieldCheck, ShieldAlert } from "lucide-react";

export const metadata = {
  title: "Профиль — OptPrice",
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
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Профиль</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Информация о вашем аккаунте
        </p>
      </div>

      {/* Avatar + summary */}
      <div className="flex items-center gap-5">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
          <User2 className="h-8 w-8" />
        </div>
        <div className="space-y-1">
          <p className="text-lg font-semibold leading-none">{user.phone}</p>
          <div className="flex items-center gap-2">
            <Badge variant={user.role === "SUPPLIER" ? "default" : "secondary"}>
              {roleLabels[user.role]}
            </Badge>
            {user.profileIsComplete ? (
              <Badge variant="success" className="gap-1">
                <ShieldCheck className="h-3 w-3" />
                Профиль заполнен
              </Badge>
            ) : (
              <Badge variant="warning" className="gap-1">
                <ShieldAlert className="h-3 w-3" />
                Профиль не заполнен
              </Badge>
            )}
          </div>
        </div>
      </div>

      {/* Details card */}
      <Card>
        <CardHeader>
          <CardTitle>Данные аккаунта</CardTitle>
          <CardDescription>
            Основная информация, привязанная к вашему профилю
          </CardDescription>
        </CardHeader>
        <CardContent>
          <dl className="divide-y divide-border">
            <div className="flex items-center gap-4 py-4">
              <dt className="flex w-36 shrink-0 items-center gap-2 text-sm text-muted-foreground">
                <Phone className="h-4 w-4" />
                Телефон
              </dt>
              <dd className="text-sm font-medium">{user.phone}</dd>
            </div>

            <div className="flex items-center gap-4 py-4">
              <dt className="flex w-36 shrink-0 items-center gap-2 text-sm text-muted-foreground">
                <User2 className="h-4 w-4" />
                Роль
              </dt>
              <dd>
                <Badge
                  variant={user.role === "SUPPLIER" ? "default" : "secondary"}
                >
                  {roleLabels[user.role]}
                </Badge>
              </dd>
            </div>

            <div className="flex items-center gap-4 py-4">
              <dt className="flex w-36 shrink-0 items-center gap-2 text-sm text-muted-foreground">
                <ShieldCheck className="h-4 w-4" />
                ID
              </dt>
              <dd className="font-mono text-sm text-muted-foreground">
                #{user.id}
              </dd>
            </div>

            <div className="flex items-center gap-4 py-4">
              <dt className="flex w-36 shrink-0 items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                Регистрация
              </dt>
              <dd className="text-sm">{formatDate(user.createdAt)}</dd>
            </div>

            <div className="flex items-center gap-4 py-4">
              <dt className="flex w-36 shrink-0 items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                Обновлён
              </dt>
              <dd className="text-sm">{formatDate(user.updatedAt)}</dd>
            </div>
          </dl>
        </CardContent>
      </Card>
    </div>
  );
}
