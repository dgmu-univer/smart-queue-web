import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Вход — OptPrice',
  description: 'Войдите или зарегистрируйтесь в B2B маркетплейсе',
};

export default function LoginPage() {
  return (
    <main className="bg-muted/40 flex min-h-screen items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="border-border bg-card rounded-2xl border px-8 py-10 shadow-sm">
          АУФ
        </div>
      </div>
    </main>
  );
}
