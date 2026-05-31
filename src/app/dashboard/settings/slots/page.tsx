import { Metadata } from 'next';

import SlotSettingsForm, { fetchSlotSettings } from '@/features/dashboard/slot-settings';

export const metadata: Metadata = {
  title: 'Настройки слотов — Панель управления — ДГМУ',
  description: 'Страница для редактирования настроек слотов',
};

export default async function Page() {
  const initialData = await fetchSlotSettings();
  return (
    <SlotSettingsForm initialData={initialData} />
  );
}
