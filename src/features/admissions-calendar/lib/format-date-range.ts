import { format } from 'date-fns';
import { ru } from 'date-fns/locale';

export function formatDateRange(start: Date | string, end: Date | string): string {
  // Преобразуем в Date если строка
  const startDate = typeof start === 'string' ? new Date(start) : start;
  const endDate = typeof end === 'string' ? new Date(end) : end;

  const startYear = startDate.getFullYear();
  const endYear = endDate.getFullYear();
  const isSameYear = startYear === endYear;

  // Форматируем начало
  let startFormatted: string;
  let endFormatted: string;

  if (isSameYear) {
    // Одинаковый год: "18 января — 12 марта 2026 г."
    startFormatted = format(startDate, 'd MMMM', { locale: ru });
    endFormatted = format(endDate, 'd MMMM yyyy \'г.\'', { locale: ru });
  } else {
    // Разные годы: "18 января 2025 г. — 12 марта 2026 г."
    startFormatted = format(startDate, 'd MMMM yyyy \'г.\'', { locale: ru });
    endFormatted = format(endDate, 'd MMMM yyyy \'г.\'', { locale: ru });
  }

  return `${startFormatted} — ${endFormatted}`;
}
