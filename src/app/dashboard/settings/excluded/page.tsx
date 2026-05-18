import ExludedSlotsTable, { ExcludeSlotItem } from '@/features/dashboard/excluded';
import { apiServer } from '@/lib/api.server';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

async function getExcludedInitData(): Promise<ExcludeSlotItem<number>[]> {
  return await apiServer('/admin-settings/excluede-slots',
    { method: 'GET', cache: 'no-store' });
}

export default async function Page() {
  const initialData = await getExcludedInitData();
  return (
    <ExludedSlotsTable initialData={initialData} />
  );
}
