import { PropsWithChildren } from 'react';

import DashboardPageHeader from '@/components/dashboard/dashboard-page-header';
import { SettingsTabs } from '@/components/dashboard/settings-tabs';

export default function Layout({ children }: PropsWithChildren) {
  return (
    <>
      <DashboardPageHeader title="Настройки" />
      <SettingsTabs />
      { children }
    </>
  );
}
