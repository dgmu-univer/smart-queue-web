import { Suspense } from 'react';
import { Metadata } from 'next';

import MainSettingsForm, { type MainSettings } from '@/features/dashboard/main-settings';
import { apiServer } from '@/lib/api.server';

export const metadata: Metadata = {
  title: 'Основные настройки — Панель управления — ДГМУ',
  description: 'Страница для редактирования основных настроек',
};

async function getMainSettingInitData(): Promise<MainSettings> {
  return await apiServer('/admin-settings/periods',
    { method: 'GET' });
}

export default async function Page() {
  const data = await getMainSettingInitData();

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <MainSettingsForm initialData={data} />
    </Suspense>
  );
}
