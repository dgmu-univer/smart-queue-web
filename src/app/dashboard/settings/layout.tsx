import { PropsWithChildren } from 'react';
import { Metadata } from 'next';

import DashboardPage from '@/components/dashboard/dashboard-page';
import { SettingsTabs } from '@/components/dashboard/settings-tabs';

export const metadata: Metadata = {
  title: 'Панель управления — ДГМУ',
  description: 'Страница для редактирования настроек',
};

export default function Layout({ children }: PropsWithChildren) {
  return (
    <DashboardPage title="Настройки">
      <SettingsTabs />
      { children }
    </DashboardPage>
  );
}
