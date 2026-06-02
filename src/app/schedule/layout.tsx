import { Suspense } from 'react';
import { Metadata } from 'next';
import { getServerSession } from 'next-auth';

import { ScheduleFallback, ScheduleProvider, Toolbar } from '@/features/schedule';
import { authOptions } from '@/lib/auth';

export const dynamic = 'force-dynamic';

const user = await getServerSession(authOptions);

export const metadata: Metadata = {
  title: `${(user?.user.fio ?? 'Оператор')} - Расписание`,
  description: 'Расписание для оператора',
};

export default function ScheduleLayout({ children }: { children: React.ReactNode }) {
  return (
    <ScheduleProvider>
      <div className="bg-background flex h-screen w-full flex-col overflow-hidden">
        <Toolbar />
        <main className="size-full flex-1 overflow-auto">
          <Suspense
            fallback={<ScheduleFallback />}
          >
            {children}
          </Suspense>
        </main>
      </div>
    </ScheduleProvider>
  );
}
