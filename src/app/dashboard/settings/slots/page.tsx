import SlotSettingsForm, { type SlotSettings } from '@/features/dashboard/slot-settings';
import { apiServer } from '@/lib/api.server';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Настройки слотов — Панель управления — ДГМУ',
  description: 'Страница для редактирования настроек слотов',
};

async function getSlotSettingInitData(): Promise<SlotSettings> {
  return await apiServer('/admin-settings/slots',
    { method: 'GET' });
}

export default async function Page() {
  const initialData = await getSlotSettingInitData();
  return (
    <SlotSettingsForm initialData={initialData} />
  );
}
