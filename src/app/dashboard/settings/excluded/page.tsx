import { Metadata } from 'next';

import ExludedSlotsManager, { type ExcludeSlotItem } from '@/features/dashboard/excluded';
import { apiServer } from '@/lib/api.server';

export const metadata: Metadata = {
  title: 'Исключенные слоты — Панель управления — ДГМУ',
  description: 'Страница для редактирования исключенных слотов',
};

async function getExcludedInitData(): Promise<ExcludeSlotItem[]> {
  return await apiServer('/admin-settings/excluede-slots',
    { method: 'GET', cache: 'no-store' });
}

export default async function Page() {
  const initialData = await getExcludedInitData();
  return (
    <ExludedSlotsManager initialData={initialData} />
  );
}
