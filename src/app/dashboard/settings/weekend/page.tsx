import { Metadata } from 'next';

import WeekendsCalendar from '@/features/dashboard/weekend';
import { apiServer } from '@/lib/api.server';

export const metadata: Metadata = {
  title: 'Нерабочные дни — Панель управления — ДГМУ',
  description: 'Страница для редактирования нерабочных дней',
};
async function getWeekendInitData(): Promise<string[]> {
  return await apiServer('/admin-settings/non-working-days',
    { method: 'GET' });
}

export default async function Page() {
  const initialData = await getWeekendInitData();
  return (
    <WeekendsCalendar initialData={initialData} />
  );
}
