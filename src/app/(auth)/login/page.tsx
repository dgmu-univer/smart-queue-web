import { AuthForm } from "@/features/auth/components/auth-form";

export const metadata = {
  title: "Вход — OptPrice",
  description: "Войдите или зарегистрируйтесь в B2B маркетплейсе",
};

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-muted/40 px-4 py-12">
      <div className="w-full max-w-md">
        <div className="rounded-2xl border border-border bg-card px-8 py-10 shadow-sm">
          <AuthForm />
        </div>
      </div>
    </main>
  );
}
