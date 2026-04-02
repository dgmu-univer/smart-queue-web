export const dynamic = "force-dynamic";

import { redirect } from "next/navigation";
import { getMe } from "@/features/user/api";
import { DashboardNav } from "@/features/user/components/dashboard-nav";
import { User } from "@/features/auth/types";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = {
    "id": 1,
    "phone": "+79991234567",
    "role": "SUPPLIER",
    "profileIsComplete": true,
    "createdAt": "2025-04-02T10:30:00.000Z",
    "updatedAt": "2025-04-02T10:30:00.000Z"
  } as User;;

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardNav user={user} />
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  );
}
