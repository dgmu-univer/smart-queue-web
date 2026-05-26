import {
  startOfMonth, endOfMonth,
  startOfWeek, endOfWeek,
  startOfDay, endOfDay,
  addMonths, subMonths,
  addWeeks, subWeeks,
  addDays, subDays,
  format,
} from 'date-fns';
import { ViewMode } from '../model/types';

interface DateRange {
  startStr: string
  endStr: string
}

export function getNavigateRange(
  mode: ViewMode,
  currentDate: Date | string,
  direction?: 'next' | 'prev',
): DateRange {
  let date = typeof currentDate === 'string' ? new Date(currentDate) : currentDate;

  // Если указано направление, сначала меняем дату
  if (direction) {
    const isNext = direction === 'next';

    switch (mode) {
      case 'month':
        date = isNext ? addMonths(date, 1) : subMonths(date, 1);
        break;
      case 'week':
        date = isNext ? addWeeks(date, 1) : subWeeks(date, 1);
        break;
      case 'day':
        date = isNext ? addDays(date, 1) : subDays(date, 1);
        break;
      case 'agenda':
        date = isNext ? addWeeks(date, 1) : subWeeks(date, 1);
        break;
    }
  }

  // Получаем start и end в зависимости от режима
  let start: Date;
  let end: Date;

  switch (mode) {
    case 'month':
      start = startOfMonth(date);
      end = endOfMonth(date);
      break;

    case 'week':
    case 'agenda':
      start = startOfWeek(date, { weekStartsOn: 1 });
      end = endOfWeek(date, { weekStartsOn: 1 });
      break;

    case 'day':
      start = startOfDay(date);
      end = endOfDay(date);
      break;
  }

  return {
    startStr: format(start, 'yyyy-MM-dd'),
    endStr: format(end, 'yyyy-MM-dd'),
  };
}
