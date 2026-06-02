import ScheduleCalendar, { fetchSchedule } from '@/features/schedule';

export default async function Page() {
  const schedule = await fetchSchedule(undefined, true);
  return (
    <ScheduleCalendar initSchedule={schedule} />
  );
}
