import { setHours, setMinutes, setSeconds } from 'date-fns';

import { WorkTimeObject } from '@/features/dashboard/main-settings';

import { CalendarEvent, GroupedCalendarEvent } from '../model/types';

export function convertToCalendarEvents(rawEvents?: CalendarEvent[]): GroupedCalendarEvent[] {
  if (!rawEvents || !Array.isArray(rawEvents)) return [];

  const map = new Map<string, GroupedCalendarEvent>();

  for (const event of rawEvents) {
    const key = `${event.start}-${event.end}`;

    if (!map.has(key)) {
      map.set(key, {
        id: key,
        start: new Date(event.start),
        end: new Date(event.end),
        pins: [],
        total: 0,
      });
    }

    const grouped = map.get(key);

    if (!grouped) continue;
    grouped.pins.push(event.title);
    grouped.total++;
  }

  return Array.from(map.values());
}

export function getMinMaxFromWorkTime(workTime: WorkTimeObject) {
  const [startHours, startMinutes, startSeconds] = workTime.start_time.split(':').map(Number);
  const [endHours, endMinutes, endSeconds] = workTime.end_time.split(':').map(Number);

  // Базовая дата (год, месяц, день не важны)
  const baseDate = new Date(1970, 0, 1);

  const min = setSeconds(setMinutes(setHours(baseDate, startHours), startMinutes), startSeconds);
  const max = setSeconds(setMinutes(setHours(baseDate, endHours), endMinutes), endSeconds);

  return { min, max };
}
