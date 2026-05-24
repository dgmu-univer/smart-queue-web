// components/CalendarToolbar.tsx
'use client';

import { useCallback } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import {
  addDays,
  addMonths,
  addWeeks,
  endOfWeek,
  format,
  startOfWeek,
  subDays,
  subMonths,
  subWeeks } from 'date-fns';
import { ru } from 'date-fns/locale';
import { signOut } from 'next-auth/react';

type ViewMode = 'month' | 'week' | 'work_week' | 'day' | 'agenda';

interface CalendarToolbarProps {
  currentDate: Date
  currentView: ViewMode
}

export function CalendarToolbar({ currentDate, currentView }: CalendarToolbarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Форматирование заголовка
  const formatTitle = useCallback(() => {
    switch (currentView) {
      case 'day':
        return format(currentDate, 'd MMMM yyyy', { locale: ru });

      case 'week':
      case 'work_week': {
        const weekStart = startOfWeek(currentDate, { weekStartsOn: 1 });
        const weekEnd = endOfWeek(currentDate, { weekStartsOn: 1 });
        const startMonth = format(weekStart, 'd MMM', { locale: ru });
        const endMonth = format(weekEnd, 'd MMM yyyy', { locale: ru });
        return `${startMonth} - ${endMonth}`;
      }

      default:
        return format(currentDate, 'MMMM yyyy', { locale: ru });
    }
  }, [currentDate, currentView]);

  // Обновление searchParams
  const updateParams = useCallback((updates: Record<string, string>) => {
    const params = new URLSearchParams(searchParams.toString());

    Object.entries(updates).forEach(([key, value]) => {
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    });

    router.push(`${pathname}?${params.toString()}`);
  }, [router, pathname, searchParams]);

  // Навигация
  const navigate = useCallback((direction: 'today' | 'prev' | 'next') => {
    let newDate = new Date(currentDate);

    switch (direction) {
      case 'prev':
        switch (currentView) {
          case 'month':
            newDate = subMonths(newDate, 1);
            break;
          case 'week':
          case 'work_week':
          case 'agenda':
            newDate = subWeeks(newDate, 1);
            break;
          case 'day':
            newDate = subDays(newDate, 1);
            break;
        }
        break;

      case 'next':
        switch (currentView) {
          case 'month':
            newDate = addMonths(newDate, 1);
            break;
          case 'week':
          case 'work_week':
          case 'agenda':
            newDate = addWeeks(newDate, 1);
            break;
          case 'day':
            newDate = addDays(newDate, 1);
            break;
        }
        break;

      case 'today':
        newDate = new Date();
        break;
    }

    updateParams({ start: format(newDate, 'yyyy-MM-dd') });
  }, [currentDate, currentView, updateParams]);

  // Смена режима отображения
  const changeView = useCallback((view: ViewMode) => {
    updateParams({ mode: view });
  }, [updateParams]);

  return (
    <div className="rbc-toolbar">
      <span className="rbc-btn-group">
        <button type="button" onClick={() => { navigate('today'); }}>
          Сегодня
        </button>
        <button type="button" onClick={() => { navigate('prev'); }}>
          Назад
        </button>
        <button type="button" onClick={() => { navigate('next'); }}>
          Вперед
        </button>
      </span>

      <span className="rbc-toolbar-label">
        {formatTitle()}
      </span>

      <span className="rbc-btn-group">
        <button
          type="button"
          className={currentView === 'month' ? 'rbc-active' : ''}
          onClick={() => { changeView('month'); }}
        >
          Месяц
        </button>
        <button
          type="button"
          className={currentView === 'week' ? 'rbc-active' : ''}
          onClick={() => { changeView('week'); }}
        >
          Неделя
        </button>
        <button
          type="button"
          className={currentView === 'day' ? 'rbc-active' : ''}
          onClick={() => { changeView('day'); }}
        >
          День
        </button>
        <button
          type="button"
          className={currentView === 'agenda' ? 'rbc-active' : ''}
          onClick={() => { changeView('agenda'); }}
        >
          Список
        </button>
        <button
          type="button"
          onClick={() => void signOut()}
        >
          Выйти
        </button>
      </span>
    </div>
  );
}
