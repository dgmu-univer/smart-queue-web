import ScheduleCalendar, { fetchSchedule } from '@/features/schedule';
import { groupedSlots } from '@/features/schedule/lib/grouped-slots';

export default async function Page() {
  const schedule = await fetchSchedule(undefined, true);
  const grouped = groupedSlots(schedule.slots);
  return (
    <ScheduleCalendar
      initialGroupedSlots={grouped}
      slotsSettings={schedule.slotsSettings}
    />
  );
}
