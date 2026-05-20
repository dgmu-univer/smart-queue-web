import { Metadata } from 'next';

import DashboardPage from '@/components/dashboard/dashboard-page';
import DegreeProgramsManager, { type DegreeProgramsItem } from '@/features/dashboard/degree-programs';
import { apiServer } from '@/lib/api.server';

export const metadata: Metadata = {
  title: 'Уровни образования — Панель управления — ДГМУ',
  description: 'Страница для редактирования уровней образования',
};

async function getDegreeInitData(): Promise<DegreeProgramsItem[]> {
  return await apiServer('/degree-programs',
    { method: 'GET' });
}

export default async function Page() {
  const initailData = await getDegreeInitData();
  return (
    <DashboardPage title="Уровни образования">
      <DegreeProgramsManager initailData={initailData} />
    </DashboardPage>
  );
}
