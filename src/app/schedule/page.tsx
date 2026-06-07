import { Suspense } from 'react';

import ScheduleCalendar, { fetchSchedule, ScheduleFallback, Toolbar } from '@/features/schedule';

export const dynamic = 'force-dynamic';

export default async function Page() {
  const initialData = await fetchSchedule();
  return (
    <div className="bg-background flex h-screen w-full flex-col overflow-hidden">
      <Toolbar view="list" />
      <main className="size-full flex-1 overflow-auto">
        <Suspense
          fallback={<ScheduleFallback />}
        >
          <ScheduleCalendar
            initialData={initialData}
          />
        </Suspense>
      </main>
    </div>
  );
}
