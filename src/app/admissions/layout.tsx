import { Suspense } from 'react';

import { CalendarSettingsProvider, fetchCalendarConfig } from '@/features/admissions-calendar';

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Загружаем конфигурацию на сервере
  const [mainSettings, slotSettings] = await fetchCalendarConfig();

  return (
    <CalendarSettingsProvider
      initialMainSettings={mainSettings}
      initialSlotSettings={slotSettings}
    >
      <Suspense fallback={<div>Loading calendar...</div>}>
        {children}
      </Suspense>
    </CalendarSettingsProvider>
  );
}
