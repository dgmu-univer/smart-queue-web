import { Grid } from '@radix-ui/themes';

import DashboardPageHeader from '@/components/dashboard/dashboard-page-header';
import { ExludedSlots, MainSettings, Weekends } from '@/features/dashboard';

export default function Page() {
  return (
    <>
      <DashboardPageHeader title="Настройки" />
      <Grid columns="1" gap="3">
        <Grid columns={{ initial: '1', lg: '1', xs: '1' }} gap="3" width="auto">
          <MainSettings />
        </Grid>
        <Grid columns="1" gap="3" width="auto">
          <Weekends />
        </Grid>
        <Grid columns="1" gap="3" width="auto">
          <ExludedSlots />
        </Grid>
      </Grid>
    </>
  );
}
