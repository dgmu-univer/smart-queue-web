import { AuthForm } from "@/features/auth/components/auth-form";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Вход — OptPrice",
  description: "Войдите или зарегистрируйтесь в B2B маркетплейсе",
};

interface LoginPageProps {
  searchParams: Promise<{ from?: string }>;
}

function sanitizeRedirect(from: string | undefined): string {
  if (from && from.startsWith("/") && !from.startsWith("//")) {
    return from;
  }
  return "/dashboard";
}

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const { from } = await searchParams;
  const redirectTo = sanitizeRedirect(from);

  return (
    <main className="flex min-h-screen items-center justify-center bg-muted/40 px-4 py-12">
      <div className="w-full max-w-md">
        <div className="rounded-2xl border border-border bg-card px-8 py-10 shadow-sm">
          <AuthForm redirectTo={redirectTo} />
        </div>
      </div>
    </main>
  );
}
