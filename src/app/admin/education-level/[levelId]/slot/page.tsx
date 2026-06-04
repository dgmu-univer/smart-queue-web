import { Metadata } from 'next';

import { LevelSettingPageParams } from '@/features/admin/education-levels/api.types';
import SlotSettingForm, { fetchSlotSettings } from '@/features/admin/education-levels/settings/slot';

export const metadata: Metadata = {
  title: 'Настройка слота',
  description:
    'Настройка длительности слота и вместимости для формирования доступных интервалов записи посетителей.',
};

export default async function Page({ params }: LevelSettingPageParams) {
  const { levelId } = await params;
  const slotSettings = await fetchSlotSettings(levelId);

  return <SlotSettingForm initialData={slotSettings} levelId={levelId} />;
}
