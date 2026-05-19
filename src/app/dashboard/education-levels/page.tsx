import DashboardPage from '@/components/dashboard/dashboard-page';
import EducationLevelManager, { type EducationLevelItem } from '@/features/dashboard/education-level';
import { apiServer } from '@/lib/api.server';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Уровни образования — Панель управления — ДГМУ',
  description: 'Страница для редактирования уровней образования',
};

async function getEducationLevelInitData(): Promise<EducationLevelItem[]> {
  return await apiServer('/degree-programs',
    { method: 'GET' });
}

export default async function Page() {
  const initailData = await getEducationLevelInitData();
  return (
    <DashboardPage title="Уровни образования">
      <EducationLevelManager initailData={initailData} />
    </DashboardPage>
  );
}
