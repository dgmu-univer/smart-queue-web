import { DashboardNav } from '@/components/dashboard/dashboard-nav';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="bg-background relative min-h-screen">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div
          className="absolute inset-0"
          style={{
            background:
               'radial-gradient(ellipse 80% 50% at 50% -10%, rgba(255, 200, 200, 0.4), transparent 60%), radial-gradient(ellipse 60% 40% at 20% 10%, rgba(255, 220, 180, 0.35), transparent 60%), radial-gradient(ellipse 60% 40% at 80% 10%, rgba(190, 220, 255, 0.35), transparent 60%)',
          }}
        />
      </div>
      <DashboardNav />
      <main className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
        {children}
      </main>
    </div>
  );
}
