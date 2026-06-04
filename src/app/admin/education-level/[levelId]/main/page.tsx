import { LevelSettingPageParams } from '@/features/admin/education-levels/api.types';
import MainSettingForm, { fetchMainSettings } from '@/features/admin/education-levels/settings/main';

export default async function Page({ params }: LevelSettingPageParams) {
  const { levelId } = await params;
  const mainSettings = await fetchMainSettings(levelId);

  return <MainSettingForm initialData={mainSettings} levelId={levelId} />;
}
