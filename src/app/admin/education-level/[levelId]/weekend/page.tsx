import { Metadata } from 'next';

import { LevelSettingPageParams } from '@/features/admin/education-levels/api.types';
import WeekendCalendar, { fetchWeekend } from '@/features/admin/education-levels/settings/weekend-days';

export const metadata: Metadata = {
  title: 'Нерабочие дни',
  description:
    'Выбор нерабочих дней в календаре для автоматической блокировки записи посетителей на указанные даты.',
};

export default async function Page({ params }: LevelSettingPageParams) {
  const { levelId } = await params;
  const weekend = await fetchWeekend(levelId);

  return <WeekendCalendar initialData={weekend} levelId={levelId} />;
}
