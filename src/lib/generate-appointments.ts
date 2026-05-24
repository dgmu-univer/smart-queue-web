// lib/generateAppointments.ts

import {
  addMinutes,
  eachDayOfInterval,
  isWeekend,
  set,
} from 'date-fns';

export interface CalendarEvent {
  id: string
  title: string
  start: Date
  end: Date
}

interface GenerateAppointmentsParams {
  from: string | Date
  to: string | Date
  degreeId?: string | number
  delayMs?: number
}

const SLOT_DURATION_MINUTES = 15;
const MAX_EVENTS_PER_SLOT = 10;

function generatePinCode(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export async function generateAppointments({
  from,
  to,
  degreeId,
  delayMs = 500,
}: GenerateAppointmentsParams): Promise<CalendarEvent[]> {
  // degreeId принимаем, но пока не используем
  void degreeId;

  await sleep(delayMs);

  const fromDate = new Date(from);
  const toDate = new Date(to);

  const events: CalendarEvent[] = [];

  const days = eachDayOfInterval({
    start: fromDate,
    end: toDate,
  });

  for (const day of days) {
    // пропускаем выходные
    if (isWeekend(day)) continue;

    let slotStart = set(day, {
      hours: 9,
      minutes: 0,
      seconds: 0,
      milliseconds: 0,
    });

    const workDayEnd = set(day, {
      hours: 18,
      minutes: 0,
      seconds: 0,
      milliseconds: 0,
    });

    while (slotStart < workDayEnd) {
      const slotEnd = addMinutes(slotStart, SLOT_DURATION_MINUTES);

      // случайное число записей в слоте
      const eventsCount = Math.floor(
        Math.random() * (MAX_EVENTS_PER_SLOT + 1),
      );

      for (let i = 0; i < eventsCount; i++) {
        events.push({
          id: crypto.randomUUID(),
          title: generatePinCode(),
          start: new Date(slotStart),
          end: new Date(slotEnd),
        });
      }

      slotStart = slotEnd;
    }
  }

  return events;
}
