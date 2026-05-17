import ExludedSlotsTable, { ExcludeSlotItem } from '@/features/dashboard/excluded';
import { apiServer } from '@/lib/api.server';

async function getExcluedeInitData(): Promise<ExcludeSlotItem<number>[]> {
  return await apiServer('/admin-settings/excluede-slots',
    { method: 'GET', next: { tags: ['excluede-slots-init'] } });
}

export default async function Page() {
  const initialData = await getExcluedeInitData();
  return (
    <ExludedSlotsTable initialData={initialData} />
  );
}
