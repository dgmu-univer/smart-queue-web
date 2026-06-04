import { LevelSettingPageParams } from '@/features/admin/education-levels/api.types';
import ExcludedSlotsTable, { fetchExcludedSlots } from '@/features/admin/education-levels/settings/excluded-slot';

export default async function Page({ params }: LevelSettingPageParams) {
  const { levelId } = await params;
  const slotSettings = await fetchExcludedSlots(levelId);

  return <ExcludedSlotsTable initialData={slotSettings} levelId={levelId} />;
}
