import { PropsWithChildren } from 'react';
import { Metadata } from 'next';

import DashboardPage from '@/components/dashboard/dashboard-page';
import { SettingsTabs } from '@/components/dashboard/settings-tabs';

export const metadata: Metadata = {
  title: 'Панель управления — ДГМУ',
  description: 'Страница для редактирования настроек',
};

export default async function Layout({ children, params }: PropsWithChildren & { params: Promise<{ degreeId: string }> }) {
  const { degreeId } = await params;

  return (
    <DashboardPage title={`Настройки — ${degreeId}`}>
      <SettingsTabs />
      { children }
    </DashboardPage>
  );
}
