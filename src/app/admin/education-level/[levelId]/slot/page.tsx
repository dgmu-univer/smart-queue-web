import { LevelSettingPageParams } from '@/features/admin/education-levels/api.types';
import SlotSettingForm, { fetchSlotSettings } from '@/features/admin/education-levels/settings/slot';

export default async function Page({ params }: LevelSettingPageParams) {
  const { levelId } = await params;
  const slotSettings = await fetchSlotSettings(levelId);

  return <SlotSettingForm initialData={slotSettings} levelId={levelId} />;
}
