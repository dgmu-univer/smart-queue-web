'use client';

import { useEffect, useState } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import { format, getDay, parse, startOfWeek } from 'date-fns';
import { ru } from 'date-fns/locale/ru'; // 🔥 Импортируем русскую локаль

import { AdmissionSlot, generateTodaySlots } from './generate-data';
import { OtherModeEventComponent } from './OtherModeEventComponent';
import { TVDayEventComponent } from './TVEventComponent';

import './tv-styles.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';

// Настраиваем локализатор с русским языком
const locales = {
  ru: ru,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

// Пример данных о слотах
const myEventsList = [
  {
    id: 1,
    title: 'Слот: Иванов Иван',
    start: new Date(2026, 4, 25, 10, 0),
    end: new Date(2026, 4, 25, 10, 30),
  },
  {
    id: 2,
    title: 'Слот: Петрова Анна',
    start: new Date(2026, 4, 25, 11, 30),
    end: new Date(2026, 4, 25, 12, 0),
  },
];

export default function BookingCalendar() {
  const [slots, setSlots] = useState<AdmissionSlot[]>([]);
  const [currentView, setCurrentView] = useState<View>('day');
  const [currentDate, setCurrentDate] = useState(new Date());

  // Загружаем слоты при монтировании и каждые 5 минут
  useEffect(() => {
    loadSlots();
    const interval = setInterval(loadSlots, 5 * 60 * 1000);
    return () => { clearInterval(interval); };
  }, []);

  const loadSlots = () => {
    const newSlots = generateTodaySlots();
    setSlots(newSlots);
  };

  const events = slots.map(slot => ({
    ...slot,
    title: slot.title,
  }));

  // Выбираем компонент в зависимости от текущего вида
  const getEventComponent = () => {
    return currentView === 'day' ? TVDayEventComponent : OtherModeEventComponent;
  };

  return (
    <div className="h-svh w-svw">
      <Calendar
        localizer={localizer}
        events={slots}
        startAccessor="start"
        endAccessor="end"
        defaultView="day"
        min={new Date(1970, 0, 1, 9, 0)} // Начинаем с 9:00
        max={new Date(1970, 0, 1, 19, 0)} // Заканчиваем в 18:00
        components={{
          event: getEventComponent(),
        }}
        step={15}
        timeslots={4}
        culture="ru" // 🔥 Указываем культуру "ru" для локализации
        dayLayoutAlgorithm="no-overlap"
        // onViewChange={(view) => setCurrentView(view as View)}
        messages={{
          today: 'Сегодня',
          previous: 'Назад',
          next: 'Вперед',
          day: 'День',
          week: 'Неделя',
          agenda: 'Список',
          month: 'Месяц'
        }}
      />
    </div>
  );
}
