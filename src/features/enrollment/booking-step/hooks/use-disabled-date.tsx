import { useCallback, useMemo } from 'react';

import { WorkDateObject } from '@/features/dashboard/main-settings';

export function useDateDisabled(periodSettings: WorkDateObject) {
  const startDate = useMemo(() => new Date(periodSettings.start_date), [periodSettings.start_date]);
  const endDate = useMemo(() => new Date(periodSettings.end_date), [periodSettings.end_date]);

  const disabledMatcher = useCallback((date: Date) => {
    return date < startDate || date > endDate;
  }, [startDate, endDate]);

  return disabledMatcher;
}
