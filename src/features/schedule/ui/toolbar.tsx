'use client';

import { useEffect } from 'react';
import { formatDate } from 'date-fns';
import { ru } from 'date-fns/locale';
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from 'lucide-react';

import { AuthUser } from '@/components/auth-user';
import { Button } from '@/components/ui/button';

import { useSchedule } from '../provider/schedule-provider';

export const Toolbar = () => {
  const { next, prev, today, increaseFont, decreaseFont, date } = useSchedule();

  useEffect(() => {
    // Добавляем класс dark при монтировании страницы
    document.documentElement.classList.add('dark');
    // Убираем при уходе со страницы (опционально)
    return () => {
      document.documentElement.classList.remove('dark');
    };
  }, []);

  return (
    <header className="bg-background flex h-14 items-center justify-between px-4">
      {/* ЛЕВАЯ ЧАСТЬ: Навигация */}
      <div className="flex items-center gap-2">
        <Button variant="outline" onClick={today} size="sm" className="h-8 px-3 font-medium">
          Сегодня
        </Button>

        {/* Группа кнопок Назад/Вперед с текстом */}
        <div className="flex -space-x-px rounded-md shadow-sm">
          <Button
            onClick={prev}
            variant="outline"
            size="sm"
            className="h-8 gap-1 rounded-r-none pr-3 pl-2 font-medium"
          >
            <ChevronLeft className="size-4" />
            Назад
          </Button>
          <Button
            onClick={next}
            variant="outline"
            size="sm"
            className="h-8 gap-1 rounded-l-none pr-2 pl-3 font-medium"
          >
            Вперед
            <ChevronRight className="size-4" />
          </Button>
        </div>
      </div>

      {/* ЦЕНТР: Диапазон дат */}
      <div className="text-foreground text-sm font-semibold tracking-tight">
        { formatDate(date, 'dd MMMM yyyy', { locale: ru }) }
      </div>

      {/* ПРАВАЯ ЧАСТЬ: Режимы и Профиль */}
      <div className="flex items-center gap-4">
        <div className="flex -space-x-px rounded-md shadow-sm">
          <Button
            onClick={decreaseFont}
            variant="outline"
            size="sm"
            className="h-8 gap-1 rounded-r-none pr-3 pl-2 font-medium"
          >
            <ZoomOut className="size-4" />
          </Button>
          <Button
            onClick={increaseFont}
            variant="outline"
            size="sm"
            className="h-8 gap-1 rounded-l-none pr-2 pl-3 font-medium"
          >
            <ZoomIn className="size-4" />
          </Button>
        </div>
        {/* Иконка юзера (Отдельно) */}
        <AuthUser />
      </div>
    </header>
  );
};
