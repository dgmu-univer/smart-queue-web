import { Metadata } from 'next';
import { redirect } from 'next/navigation';

import { LevelSettingPageParams } from '@/features/admin/education-levels/api.types';

export const metadata: Metadata = {
  title: 'Настройки расписания',
  description: 'Управление расписанием работы, слотами записи и доступностью приёма посетителей.',
};

export default async function Page({ params }: LevelSettingPageParams) {
  const { levelId } = await params;
  redirect(`/admin/education-level/${levelId}/main`);
}
