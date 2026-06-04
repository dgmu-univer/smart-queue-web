import { redirect } from 'next/navigation';

import { LevelSettingPageParams } from '@/features/admin/education-levels/api.types';

export default async function Page({ params }: LevelSettingPageParams) {
  const { levelId } = await params;
  redirect(`/admin/education-level/${levelId}/main`);
}
