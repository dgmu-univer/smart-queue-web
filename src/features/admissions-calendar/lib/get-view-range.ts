import { startOfMonth, endOfMonth, startOfWeek, endOfWeek } from 'date-fns';
import { ViewMode } from '../model/types';
import { dateAsApiString } from '@/lib/date';

export function getViewRange(mode: ViewMode, start: string) {
  const dateObj = new Date(start);
  switch (mode) {
    case 'month':
      return {
        start: dateAsApiString(startOfMonth(dateObj)),
        end: dateAsApiString(endOfMonth(dateObj)),
      }
    case 'week':
      return {
        start: dateAsApiString(startOfWeek(dateObj, { weekStartsOn: 1 })),
        end: dateAsApiString(endOfWeek(dateObj, { weekStartsOn: 1 })),
      }
    default:
      return {
        start: dateAsApiString(dateObj),
        end: dateAsApiString(dateObj),
      }
  }
}
