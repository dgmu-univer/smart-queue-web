import { Suspense } from 'react';
import { Metadata } from 'next';

import MainSettingsForm, { fetchMainSettings } from '@/features/dashboard/main-settings';

export const metadata: Metadata = {
  title: 'Основные настройки — Панель управления — ДГМУ',
  description: 'Страница для редактирования основных настроек',
};

export default async function Page() {
  const data = await fetchMainSettings();

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <MainSettingsForm initialData={data} />
    </Suspense>
  );
}
