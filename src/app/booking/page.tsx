import {
  addDays,
  endOfMonth,
  endOfWeek,
  isValid,
  parseISO } from 'date-fns';

import BookingCalendar from '@/features/booking-calendar';

// app/calendar/page.tsx

interface PageProps {
  searchParams: Promise<{
    start?: string
    end?: string
    mode?: 'month' | 'week' | 'work_week' | 'day' | 'agenda'
  }>
}

export default async function CalendarPage({ searchParams }: PageProps) {
  const params = await searchParams;

  // Парсим параметры с валидацией
  let startDate = params.start ? parseISO(params.start) : new Date();
  const mode = params.mode ?? 'month';

  // Валидация даты
  if (!isValid(startDate)) {
    startDate = new Date();
  }

  // Определяем endDate на основе startDate и режима
  const endDate = getEndDateByMode(startDate, mode);

  console.log({
    start: startDate,
    end: endDate,
    mode,
  })
  // Получаем данные с бэкенда
  // const events = await fetchEvents({
  //   start: startDate,
  //   end: endDate,
  //   mode,
  // });

  // Передаем в клиентский компонент
  return (
    <BookingCalendar
      initialEvents={[]}
      initialDate={startDate}
      initialView={mode}
    />
  );
}

// Хелпер для определения endDate по режиму
function getEndDateByMode(startDate: Date, mode: string): Date {
  switch (mode) {
    case 'day':
      return addDays(startDate, 1);

    case 'week':
      return endOfWeek(startDate, { weekStartsOn: 1 });

    case 'work_week':
      // Рабочая неделя: понедельник - пятница
      const workEnd = new Date(startDate);
      const dayOfWeek = workEnd.getDay();
      const daysToFriday = dayOfWeek === 0 ? 5 : 5 - dayOfWeek;
      return addDays(workEnd, daysToFriday);

    case 'month':
    default:
      return endOfMonth(startDate);
  }
}
