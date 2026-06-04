import { Metadata } from 'next';

import { LevelSettingPageParams } from '@/features/admin/education-levels/api.types';
import MainSettingForm, { fetchMainSettings } from '@/features/admin/education-levels/settings/main';

export const metadata: Metadata = {
  title: 'Основные настройки',
  description:
    'Настройка периода работы приёмной комиссии, рабочего времени и обеденного перерыва.',
};

export default async function Page({ params }: LevelSettingPageParams) {
  const { levelId } = await params;
  const mainSettings = await fetchMainSettings(levelId);

  return <MainSettingForm initialData={mainSettings} levelId={levelId} />;
}
