import { CalendarEvent } from "../model/types"

// features/admissions-calendar/api/fetchMockEvents.ts
interface RawEvent {
  id: number
  title: string
  start: string
  end: string
}

interface FetchEventsParams {
  start: string // "2026-05-26"
  end: string // "2026-05-26"
}

// Генерация случайного количества человек (от 3 до 10)
function getRandomCapacity(): number {
  return Math.floor(Math.random() * 8) + 3; // 3-10 включительно
}

// Форматирование числа с ведущим нулём
function padNumber(num: number): string {
  return num.toString().padStart(2, '0');
}

export async function fetchMockEvents({ start, end }: FetchEventsParams): Promise<CalendarEvent[]> {
  // Задержка для имитации сети
  await new Promise(resolve => setTimeout(resolve, 500));

  const startDate = new Date(start);
  const endDate = new Date(end);
  const daysDiff = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1;

  const events: RawEvent[] = [];
  let id = 1;

  // Настройки рабочего дня
  const WORK_START_HOUR = 9; // 9:00
  const WORK_END_HOUR = 18; // 18:00
  const SLOT_MINUTES = 15; // 15 минут
  const MIN_CAPACITY = 3;
  const MAX_CAPACITY = 10;

  // Количество слотов в день: 9 часов * 60 минут / 15 минут = 36 слотов
  const slotsPerDay = ((WORK_END_HOUR - WORK_START_HOUR) * 60) / SLOT_MINUTES;

  for (let day = 0; day < daysDiff; day++) {
    const currentDate = new Date(startDate);
    currentDate.setDate(startDate.getDate() + day);

    // Пропускаем выходные (суббота = 6, воскресенье = 0)
    const dayOfWeek = currentDate.getDay();
    if (dayOfWeek === 0 || dayOfWeek === 6) continue;

    // Генерируем слоты для каждого дня
    for (let slotIndex = 0; slotIndex < slotsPerDay; slotIndex++) {
      const totalMinutesFromStart = slotIndex * SLOT_MINUTES;
      const hour = WORK_START_HOUR + Math.floor(totalMinutesFromStart / 60);
      const minute = totalMinutesFromStart % 60;

      const startTime = new Date(currentDate);
      startTime.setHours(hour, minute, 0, 0);

      const endTime = new Date(startTime);
      endTime.setMinutes(endTime.getMinutes() + SLOT_MINUTES);

      // Генерируем количество человек для этого слота
      const capacity = getRandomCapacity();

      // Формируем заголовок: "3/10" или "7/10"
      const title = `${capacity}/${MAX_CAPACITY}`;

      events.push({
        id: id++,
        title,
        start: startTime.toISOString(),
        end: endTime.toISOString(),
      });
    }
  }

  return events;
}
