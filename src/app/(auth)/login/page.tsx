import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';

import { AuthModule } from '@/features/auth/auth-module';
import { authOptions } from '@/lib/auth';

export default async function LoginPage() {
  const session = await getServerSession(authOptions);

  if (session) {
    return redirect('/dashboard');
  }

  return (
    <main className="relative flex min-h-svh items-center justify-center overflow-hidden px-4 py-12">
      {/* Gradient background - same as main page */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(120%_80%_at_50%_-10%,#fde8ef_0%,#fff5e6_28%,#eef3ff_58%,#ffffff_85%)]"
      />
      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute -top-24 left-1/2 -z-10 h-120 w-205 -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(255,200,210,0.55),rgba(255,200,210,0)_70%)] blur-2xl
        "
      />
      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute top-40 right-[-10%] -z-10 hidden h-105 w-130 rounded-full bg-[radial-gradient(closest-side,rgba(190,210,255,0.5),rgba(190,210,255,0)_70%)] blur-2xl sm:block
        "
      />
      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute top-72 left-[-10%] -z-10 hidden h-105 w-130 rounded-full bg-[radial-gradient(closest-side,rgba(255,225,180,0.45),rgba(255,225,180,0)_70%)] blur-2xl sm:block
        "
      />

      {/* Logo */}
      <div className="absolute top-6 left-1/2 flex -translate-x-1/2 flex-col items-center gap-1 sm:top-8">
        <div className="bg-foreground text-background flex size-12 items-center justify-center rounded-xl">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="size-7"
          >
            <circle cx="12" cy="12" r="10" />
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v4" />
            <path d="M12 18v4" />
            <path d="M2 12h4" />
            <path d="M18 12h4" />
            <path d="M4.93 4.93l2.83 2.83" />
            <path d="M16.24 16.24l2.83 2.83" />
            <path d="M4.93 19.07l2.83-2.83" />
            <path d="M16.24 7.76l2.83-2.83" />
          </svg>
        </div>
        <span className="text-sm font-semibold">ДГМУ</span>
      </div>
      <AuthModule />
    </main>
  );
}
