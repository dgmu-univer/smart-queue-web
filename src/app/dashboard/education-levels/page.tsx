import DashboardPageHeader from '@/components/dashboard/dashboard-page-header';
import EducationLevelsManager from '@/features/dashboard/education-level';

export default function Page() {
  return (
    <>
      <DashboardPageHeader title="Уровни образования" />
      <EducationLevelsManager />
    </>
  );
}
