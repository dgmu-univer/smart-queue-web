import { getServerSession } from 'next-auth';
import {
  addDays,
  endOfMonth,
  endOfWeek,
  isValid,
  parseISO } from 'date-fns';

import BookingCalendar from '@/features/booking-calendar';
import { CalendarEvent } from '@/features/booking-calendar/booking-calendar';
import { apiServer } from '@/lib/api.server';
import { authOptions } from '@/lib/auth';
import { dateAsApiString } from '@/lib/date';
// app/calendar/page.tsx

interface PageProps {
  searchParams: Promise<{
    start?: string
    end?: string
    mode?: 'month' | 'week' | 'work_week' | 'day' | 'agenda'
  }>
}

const fetchEvents = async ({ start, end }: { start: Date, end: Date }) => {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    throw new Error('Unautho rized: User not authenticated');
  }

  // Получаем degreeId из сессии (username)
  const degreeId = session.user.username;

  if (!degreeId) {
    throw new Error('DegreeId not found in user session');
  }

  // Форматируем даты для API
  const fromDate = dateAsApiString(start);
  const toDate = dateAsApiString(end);
  return await apiServer<CalendarEvent[]>(`/appointments?from=${fromDate}&to=${toDate}&degreeId=${degreeId}`, {
    method: 'GET',
  });
  // console.log('Payload', {
  //   from: fromDate,
  //   to: toDate,
  //   degreeId,
  // })
  // return await generateAppointments({
  //   from: fromDate,
  //   to: toDate,
  //   degreeId,
  // });
};

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

  // Получаем данные с бэкенда
  const events = await fetchEvents({
    start: startDate,
    end: endDate,
  });
  // Передаем в клиентский компонент
  return (
    <BookingCalendar
      initialEvents={events}
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
