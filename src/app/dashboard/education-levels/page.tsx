import DashboardPageHeader from '@/components/dashboard/dashboard-page-header';
import EducationLevelManager, { type EducationLevelItem } from '@/features/dashboard/education-level';
import { apiServer } from '@/lib/api.server';

async function getEducationLevelInitData(): Promise<EducationLevelItem[]> {
  return await apiServer('/admin-settings/degree-programs',
    { method: 'GET', next: { tags: ['degree-programs-slots-init'] } });
}

export default async function Page() {
  const initailData = await getEducationLevelInitData();
  return (
    <>
      <DashboardPageHeader title="Уровни образования" />
      <EducationLevelManager initailData={initailData} />
    </>
  );
}
