import { Metadata } from 'next';
import { redirect } from 'next/navigation';

import { LevelSettingPageParams } from '@/features/admin/education-levels/api.types';

export const metadata: Metadata = {
  title: 'Настройки расписания',
  description: 'Управление расписанием работы, слотами записи и доступностью приёма посетителей.',
};

export default async function Page({ params, searchParams }: LevelSettingPageParams) {
  const { levelId } = await params;
  const queryParams = await searchParams;
  const name = queryParams.name ?? '';
  redirect(`/admin/education-level/${levelId}/main?name=${name}`);
}
