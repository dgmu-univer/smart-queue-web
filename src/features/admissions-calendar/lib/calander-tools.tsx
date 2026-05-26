import { setHours, setMinutes, setSeconds } from 'date-fns';

import { WorkTimeObject } from '@/features/dashboard/main-settings';

import { CalendarEvent, ConvertedEvent } from '../model/types';

export function convertToCalendarEvents(rawEvents?: CalendarEvent[]): ConvertedEvent[] {
  if (!rawEvents || !Array.isArray(rawEvents)) return [];

  return rawEvents.map(event => ({
    id: event.id,
    title: event.title,
    start: new Date(event.start),
    end: new Date(event.end),
  }));
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
