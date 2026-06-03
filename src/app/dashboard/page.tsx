import { Metadata } from 'next';

import DashboardPage from '@/components/dashboard/dashboard-page';
import DegreeManager, { fetchAllDegree } from '@/features/dashboard/degree-manager';
import Statistics from '@/features/statistics';

export const metadata: Metadata = {
  title: 'Статистика — Панель управления — ДГМУ',
  description: 'Страница для просмотра статистики',
};

export default async function Page() {
  const initialDegree = await fetchAllDegree();

  return (
    <DashboardPage title="Статистика">
      <Statistics />
      <DegreeManager initialDegrees={initialDegree} />
    </DashboardPage>
  );
}
