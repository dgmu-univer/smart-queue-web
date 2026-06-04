import type { Metadata } from 'next';

import EducationLevelTable, { fetchAllEducationLevels } from '@/features/admin/education-levels/table';
import AdminStats from '@/features/admin/statistics';

export const metadata: Metadata = {
  title: 'Настройки расписания приёмной комиссии',
  description:
    'Настройка периода работы, рабочего времени, параметров записи посетителей, нерабочих дней и исключённых слотов.'
};

export default async function AdminDashboardPage() {
  const initialLevels = await fetchAllEducationLevels();
  const stats = initialLevels.map(l => ({ id: l.id, name: l.name }));

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-foreground text-2xl font-semibold">Статистика</h1>
      </div>
      <AdminStats educationsLevels={stats} />
      <EducationLevelTable initialLevels={initialLevels} />
    </div>
  );
}
