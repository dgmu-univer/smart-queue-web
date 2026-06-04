import { LevelSettingPageParams } from '@/features/admin/education-levels/api.types';
import WeekendCalendar, { fetchWeekend } from '@/features/admin/education-levels/settings/weekend-days';

export default async function Page({ params }: LevelSettingPageParams) {
  const { levelId } = await params;
  const weekend = await fetchWeekend(levelId);

  return <WeekendCalendar initialData={weekend} levelId={levelId} />;
}
