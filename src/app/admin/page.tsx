import EducationLevelTable, { fetchAllEducationLevels } from '@/features/admin/education-levels/table';

export default async function AdminDashboardPage() {
  const initialLevels = await fetchAllEducationLevels();
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-foreground text-2xl font-semibold">Статистика</h1>
      </div>
      <EducationLevelTable initialLevels={initialLevels} />
    </div>
  );
}
