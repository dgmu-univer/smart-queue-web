import EducationLevelTable, { fetchAllEducationLevels } from '@/features/admin/education-levels/table';
import AdminStats from '@/features/admin/statistics';

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
