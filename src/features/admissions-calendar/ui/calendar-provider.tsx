// contexts/CalendarSettingsContext.tsx
'use client';

import { ReactNode, useCallback, useState } from 'react';

import { PeriodSetting } from '@/features/dashboard/api.types';
import { SlotSettings } from '@/features/dashboard/degree-slot-settings/lib/schema';

import { CalendarSettingsContext } from '../context/context';

interface CalendarSettingsProviderProps {
  children: ReactNode
  initialMainSettings: PeriodSetting
  initialSlotSettings: SlotSettings
}

export function CalendarSettingsProvider({
  children,
  initialMainSettings,
  initialSlotSettings,
}: CalendarSettingsProviderProps) {
  const [mainSettings] = useState<PeriodSetting | null>(initialMainSettings);
  const [slotSettings] = useState<SlotSettings | null>(initialSlotSettings);
  const [isLoading] = useState(false);
  const [error] = useState<string | null>(null);

  const refetch = useCallback(async () => {
    // setIsLoading(true);
    // setError(null);

    // try {
    //   const response = await fetch('/api/calendar-settings');
    //   if (!response.ok) {
    //     throw new Error('Failed to refetch settings');
    //   }

    //   const [mainSettings, slotSettings] = await fetchCalendarConfig();
    //   setMainSettings(mainSettings);
    //   setSlotSettings(slotSettings);
    // } catch (err) {
    //   setError(err instanceof Error ? err.message : 'Unknown error');
    // } finally {
    //   setIsLoading(false);
    // }
  }, []);

  return (
    <CalendarSettingsContext.Provider value={{
      mainSettings,
      slotSettings,
      isLoading,
      error,
      refetch,
    }}
    >
      {children}
    </CalendarSettingsContext.Provider>
  );
}
