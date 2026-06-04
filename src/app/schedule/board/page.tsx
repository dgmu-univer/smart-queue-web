import { fetchSchedule, ScheduleBoard } from '@/features/schedule';

export const dynamic = 'force-dynamic';

export default async function Page() {
  const initialData = await fetchSchedule();
  return (
    <ScheduleBoard
      initialData={initialData}
    />
  );
}
