import { Grid } from '@radix-ui/themes';

import DashboardPageHeader from '@/components/dashboard/dashboard-page-header';
import { MainSettings, Weekends } from '@/features/dashboard';

export default function DashboardPage() {
  return (
    <>
      <DashboardPageHeader title="Панель управления" />
      <Grid columns="1" gap="3">
        <Grid columns={{ initial: '1', lg: '1', xs: '1' }} gap="3" width="auto">
          <MainSettings />
        </Grid>
        <Grid columns="1" gap="3" width="auto">
          <Weekends />
        </Grid>
      </Grid>
    </>
  );
}
