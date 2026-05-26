import { CalendarEvent } from '../model/types';

// features/admissions-calendar/api/fetchMockEvents.ts
interface RawEvent {
  id: number
  title: string // PIN-код (6 цифр)
  start: string
  end: string
}

interface GenerateEventsParams {
  start: string // "2027-03-01"
  end: string // "2027-03-07"
}

// Генерация случайного PIN-кода (6 цифр)
function generatePin(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// Генерация случайного количества записей для слота (от 3 до 10)
function getRandomRecordsCount(): number {
  return Math.floor(Math.random() * 8) + 3; // 3-10
}

export async function fetchMockEvents({ start, end }: GenerateEventsParams): Promise<CalendarEvent[]> {
  // Задержка для имитации сети
  await new Promise(resolve => setTimeout(resolve, 500));

  const startDate = new Date(start);
  const endDate = new Date(end);
  const daysDiff = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1;

  const events: RawEvent[] = [];
  let id = 1;

  const WORK_START_HOUR = 9; // 9:00
  const WORK_END_HOUR = 18; // 18:00
  const SLOT_MINUTES = 15; // 15 минут

  const slotsPerDay = ((WORK_END_HOUR - WORK_START_HOUR) * 60) / SLOT_MINUTES; // 36 слотов в день

  for (let day = 0; day < daysDiff; day++) {
    const currentDate = new Date(startDate);
    currentDate.setDate(startDate.getDate() + day);
    currentDate.setHours(0, 0, 0, 0);

    // Пропускаем выходные (суббота = 6, воскресенье = 0)
    const dayOfWeek = currentDate.getDay();
    if (dayOfWeek === 0 || dayOfWeek === 6) continue;

    for (let slotIndex = 0; slotIndex < slotsPerDay; slotIndex++) {
      const totalMinutesFromStart = slotIndex * SLOT_MINUTES;
      const hour = WORK_START_HOUR + Math.floor(totalMinutesFromStart / 60);
      const minute = totalMinutesFromStart % 60;

      const slotStart = new Date(currentDate);
      slotStart.setHours(hour, minute, 0, 0);

      const slotEnd = new Date(slotStart);
      slotEnd.setMinutes(slotEnd.getMinutes() + SLOT_MINUTES);

      // Генерируем случайное количество записей для этого слота (3-10)
      const recordsCount = getRandomRecordsCount();

      // Создаём отдельную запись для каждого человека
      for (let i = 0; i < recordsCount; i++) {
        events.push({
          id: id++,
          title: generatePin(),
          start: slotStart.toISOString(),
          end: slotEnd.toISOString(),
        });
      }
    }
  }

  return events;
}
