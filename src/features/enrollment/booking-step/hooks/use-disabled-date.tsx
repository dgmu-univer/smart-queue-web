import { useCallback, useMemo } from 'react';

import { WorkDateSettings } from '@/features/dashboard/api.types';

export function useDateDisabled(periodSettings: WorkDateSettings) {
  const startDate = useMemo(() => new Date(periodSettings.start_date), [periodSettings.start_date]);
  const endDate = useMemo(() => new Date(periodSettings.end_date), [periodSettings.end_date]);

  const disabledMatcher = useCallback((date: Date) => {
    return date < startDate || date > endDate;
  }, [startDate, endDate]);

  return disabledMatcher;
}
