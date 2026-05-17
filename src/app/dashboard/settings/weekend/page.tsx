import WeekendsCalendar from '@/features/dashboard/weekend';
import { apiServer } from '@/lib/api.server';

async function getWeekendInitData(): Promise<string[]> {
  return await apiServer('/admin-settings/non-working-days',
    { method: 'GET', next: { tags: ['weekend-settings-init'] } });
}

export default async function Page() {
  const initialData = await getWeekendInitData();
  return (
    <WeekendsCalendar initialData={initialData} />
  );
}
