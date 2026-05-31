import {
  startOfMonth, endOfMonth,
  startOfWeek, endOfWeek,
  startOfDay, endOfDay,
  format,
} from 'date-fns';
import { ViewMode } from '../model/types';

export function getTodayRange(mode: ViewMode): { startStr: string, endStr: string } {
  const today = new Date();

  let start: Date;
  let end: Date;

  switch (mode) {
    case 'month':
      start = startOfMonth(today);
      end = endOfMonth(today);
      break;

    case 'week':
    case 'agenda':
      start = startOfWeek(today, { weekStartsOn: 1 });
      end = endOfWeek(today, { weekStartsOn: 1 });
      break;

    case 'day':
      start = startOfDay(today);
      end = endOfDay(today);
      break;
  }

  return {
    startStr: format(start, 'yyyy-MM-dd'),
    endStr: format(end, 'yyyy-MM-dd'),
  };
}
