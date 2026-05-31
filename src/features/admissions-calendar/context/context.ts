'use client';

import { CalendarSettingsContextType } from '../model/types';
import { createContext, useContext } from 'react';

export const CalendarSettingsContext = createContext<CalendarSettingsContextType | null>({
  mainSettings: null,
  slotSettings: null,
  isLoading: false,
  error: null,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  refetch: async () => {},
});

export function useCalendarSettings() {
  const context = useContext(CalendarSettingsContext);
  if (!context) {
    throw new Error('useCalendarSettings must be used within CalendarSettingsProvider');
  }
  return context;
}
