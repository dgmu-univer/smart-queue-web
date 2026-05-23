// app/calendar/CalendarClient.tsx
'use client';

import { useEffect, useMemo, useState } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import { useSearchParams } from 'next/navigation';
import {
  format,
  getDay,
  isValid,
  parse,
  parseISO,
  startOfWeek } from 'date-fns';
import { ru } from 'date-fns/locale';

import { CalendarToolbar } from './components/toolbar';

import 'react-big-calendar/lib/css/react-big-calendar.css';

// Настройка локализации для date-fns
const locales = {
  ru: ru,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: date => startOfWeek(date, { weekStartsOn: 1 }),
  getDay,
  locales,
});

interface CalendarEvent {
  id: string
  title: string
  start: Date
  end: Date
  allDay?: boolean
  description?: string
}

interface CalendarClientProps {
  initialEvents: CalendarEvent[]
  initialDate: Date
  initialView: 'month' | 'week' | 'work_week' | 'day' | 'agenda'
}

export default function CalendarClient({
  initialEvents,
  initialDate,
  initialView,
}: CalendarClientProps) {
  const searchParams = useSearchParams();
  const [events] = useState(initialEvents);
  const [currentDate, setCurrentDate] = useState(initialDate);
  const [currentView, setCurrentView] = useState(initialView);

  // Синхронизация с searchParams
  useEffect(() => {
    const mode = searchParams.get('mode') as typeof initialView | null;
    const start = searchParams.get('start');

    if (mode && mode !== currentView) {
      setCurrentView(mode);
    }

    if (start) {
      const newDate = parseISO(start);
      if (isValid(newDate)) {
        setCurrentDate(newDate);
      }
    }
  }, [searchParams, currentView]);

  // Маппинг режимов для react-big-calendar
  const calendarView = useMemo(() => {
    switch (currentView) {
      case 'week': return 'week';
      case 'work_week': return 'work_week';
      case 'day': return 'day';
      case 'agenda': return 'agenda';
      default: return 'month';
    }
  }, [currentView]);

  // Обработчики (пустые, т.к. управление через тулбар)
  const handleNavigate = (date: Date) => {
    // Навигация происходит через тулбар и searchParams
    // Этот метод можно оставить пустым или добавить аналитику
    console.log('Navigate requested to:', date);
  };

  const handleViewChange = (view: string) => {
    // Смена представления через тулбар
    console.log('View change requested to:', view);
  };

  return (
    <div className="calendar-container">
      <Calendar
        localizer={localizer}
        events={events}
        date={currentDate}
        view={calendarView}
        onNavigate={handleNavigate}
        onView={handleViewChange}
        components={{
          toolbar: () => (
            <CalendarToolbar
              currentDate={currentDate}
              currentView={currentView}
            />
          ),
        }}
        culture="ru"
        formats={{
          dateFormat: 'dd',
          dayFormat: 'dd EEE',
          weekdayFormat: 'EEEE',
          monthHeaderFormat: 'MMMM yyyy',
          dayHeaderFormat: 'd MMMM yyyy',
          agendaDateFormat: 'dd MMM yyyy',
          agendaTimeFormat: 'HH:mm',
          agendaTimeRangeFormat: ({ start, end }, culture, localizer) => {
            return `${localizer.format(start, 'HH:mm', culture)} — ${localizer.format(end, 'HH:mm', culture)}`;
          },
        }}
        messages={{
          today: 'Сегодня',
          previous: 'Назад',
          next: 'Вперед',
          month: 'Месяц',
          week: 'Неделя',
          day: 'День',
          agenda: 'Список',
          date: 'Дата',
          time: 'Время',
          event: 'Событие',
          noEventsInRange: 'Нет событий в выбранном периоде',
          showMore: total => `+ ещё ${total}`,
        }}
        style={{ height: 'calc(100vh - 120px)' }}
        popup
        selectable
        step={30}
        timeslots={2}
        defaultView="month"
      />
    </div>
  );
}
