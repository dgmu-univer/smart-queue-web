import AppointmentsSteps from '@/features/appointments/appointments-steps';

export default function Page() {
  return (
    <main className="relative flex min-h-svh items-center justify-center overflow-hidden px-4 py-16 sm:py-20">
      {/* Gradient background — same vibe as landing/login */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(120%_80%_at_50%_-10%,#fde8ef_0%,#fff5e6_28%,#eef3ff_58%,#ffffff_85%)]"
      />
      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute -top-24 left-1/2 -z-10 h-[480px] w-[820px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(255,200,210,0.55),rgba(255,200,210,0)_70%)]
          blur-2xl
        "
      />
      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute top-40 right-[-10%] -z-10 hidden h-[420px] w-[520px] rounded-full bg-[radial-gradient(closest-side,rgba(190,210,255,0.5),rgba(190,210,255,0)_70%)] blur-2xl
          sm:block
        "
      />
      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute top-72 left-[-10%] -z-10 hidden h-[420px] w-[520px] rounded-full bg-[radial-gradient(closest-side,rgba(255,225,180,0.45),rgba(255,225,180,0)_70%)] blur-2xl
          sm:block
        "
      />

      {/* Brand */}
      <div className="absolute top-6 left-1/2 flex -translate-x-1/2 flex-col items-center gap-1 sm:top-8">
        <div className="bg-foreground text-background flex size-11 items-center justify-center rounded-xl">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="size-6"
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
        <span className="text-sm font-semibold">PhotoPro</span>
      </div>
      <AppointmentsSteps />
    </main>
  );
}
