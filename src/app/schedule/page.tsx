import ScheduleCalendar, { fetchSchedule } from '@/features/schedule';

export default async function Page() {
  const initialData = await fetchSchedule();
  console.log(initialData)
  return (
    <ScheduleCalendar
      initialData={initialData}
    />
  );
}
