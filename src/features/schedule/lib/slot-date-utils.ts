import { format, parse } from 'date-fns';
import { FetchScheduleSlot } from '../api/types';
import { ru } from 'date-fns/locale';

export function isCurrentSlot(slot: FetchScheduleSlot) {
  const now = new Date();

  return (
    now >= new Date(slot.start)
    && now < new Date(slot.end)
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
