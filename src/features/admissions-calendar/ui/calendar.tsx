'use client';

import { useMemo } from 'react';
import { Calendar, dateFnsLocalizer, Formats } from 'react-big-calendar';
import {
  format,
  getDay,
  parse,
  startOfWeek } from 'date-fns';
import { ru } from 'date-fns/locale';

import { useCalendarSettings } from '../context/context';
import { convertToCalendarEvents, getMinMaxFromWorkTime } from '../lib/calander-tools';
import { CalendarEvent, ViewMode } from '../model/types';

// Создаём объект с необходимыми методами для dateFnsLocalizer
const formats: Formats = {
  dateFormat: 'dd',
  dayFormat: 'dd EEE',
  weekdayFormat: 'EEEE',
  monthHeaderFormat: 'MMMM yyyy',
  dayHeaderFormat: 'd MMMM yyyy',
  agendaDateFormat: 'dd MMM yyyy',
  agendaTimeFormat: 'HH:mm',
  agendaTimeRangeFormat: ({ start, end }: { start: Date, end: Date }, culture: string, localizer: any) => {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions, @typescript-eslint/no-unsafe-member-access
    return `${localizer.format(start, 'HH:mm', culture)} — ${localizer.format(end, 'HH:mm', culture)}`;
  },
};

// Настройка локализации для date-fns
const locales = {
  ru: ru,
};

// Правильная настройка localizer
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: (date: Date) => startOfWeek(date, { weekStartsOn: 1 }),
  getDay,
  locales,
});

interface AdmissionsCalendarProps {
  initialData?: CalendarEvent[]
  mode: ViewMode
  startDate?: string
}

export function AdmissionsCalendar({ initialData, mode, startDate }: AdmissionsCalendarProps) {
  const { mainSettings, slotSettings } = useCalendarSettings();

  const workTime = useMemo<{ min?: Date, max?: Date }>(() => {
    if (!mainSettings) return { max: undefined, min: undefined };
    return getMinMaxFromWorkTime(mainSettings.work_time);
  }, [mainSettings]);

  const slotConfig = useMemo<{ timeslots?: number, slot?: number }>(() => {
    if (!slotSettings) return { timeslots: undefined, slot: undefined };
    const slotTime = isNaN(slotSettings.duration_minutes) ? 5 : slotSettings.duration_minutes;
    return {
      step: slotTime,
      timeslots: Math.trunc(60 / slotTime),
    };
  }, [slotSettings]);

  const events = useMemo(() => {
    if (!initialData) return [];
    return convertToCalendarEvents(initialData);
  }, [initialData]);

  return (
    <Calendar
      localizer={localizer}
      events={events}
      view={mode}
      date={startDate}
      culture="ru"
      formats={formats}
      toolbar={false}
      selectable
      defaultView="month"
      {...workTime}
      {...slotConfig}
    />
  );
}
