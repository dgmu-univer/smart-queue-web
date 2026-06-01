import { DegreeIdParams } from '@/features/dashboard/api.types';
import WeekendCalendar, { fetchWeekend } from '@/features/dashboard/degree-weekend-setting';

export default async function Page({ params }: DegreeIdParams) {
  const { degreeId } = await params;
  const weekend = await fetchWeekend(degreeId);

  return <WeekendCalendar initialData={weekend} degreeId={degreeId} />;
}
