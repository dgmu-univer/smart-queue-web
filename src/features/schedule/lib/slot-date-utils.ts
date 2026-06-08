import { format, parse } from 'date-fns';
import { FetchScheduleSlot } from '../api/types';
import { ru } from 'date-fns/locale';

function timeToMinutes(dateString: string): number {
  const date = new Date(dateString);

  return date.getHours() * 60 + date.getMinutes();
}

export function isCurrentSlot(slot: FetchScheduleSlot): boolean {
  const now = new Date();

  const nowMinutes = now.getHours() * 60 + now.getMinutes();

  const startMinutes = timeToMinutes(slot.start);
  const endMinutes = timeToMinutes(slot.end);

  return (
    nowMinutes >= startMinutes
    && nowMinutes < endMinutes
  );
}

export function getSlotTime(slot: FetchScheduleSlot) {
  return `${format(slot.start, 'HH:mm')} — ${format(slot.end, 'HH:mm')}`;
}

export function formatTitleDate(inputDate: string) {
  // Парсим входную дату
  const date = parse(inputDate, 'yyyy-MM-dd', new Date());
  // Форматируем в нужный вид: день, месяц (3 буквы), год
  return format(date, 'dd MMM yyyy', { locale: ru });
}
