'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

import { ViewMode, ViewModeToggleRecord } from '../model/types';

const viewModeToggle: ViewModeToggleRecord[] = [
  { id: 'month', label: 'Месяц', isDisabled: false },
  { id: 'week', label: 'Неделя', isDisabled: false },
  { id: 'day', label: 'День', isDisabled: false },
  { id: 'agenda', label: 'Список', isDisabled: false },
];

export function CalendarToolbar() {
  const [activeView, setActiveView] = useState('month');

  const handleViewChange = (view: ViewMode) => {
    setActiveView(view);
  };

  return (
    <header className="bg-background flex h-14 items-center justify-between px-4">
      {/* ЛЕВАЯ ЧАСТЬ: Навигация */}
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" className="h-8 px-3 font-medium">
          Сегодня
        </Button>

        {/* Группа кнопок Назад/Вперед с текстом */}
        <div className="flex -space-x-px rounded-md shadow-sm">
          <Button
            variant="outline"
            size="sm"
            className="h-8 gap-1 rounded-r-none pr-3 pl-2 font-medium"
          >
            <ChevronLeft className="size-4" />
            Назад
          </Button>
          <Button
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
        18 января — 12 марта 2026 г.
      </div>

      {/* ПРАВАЯ ЧАСТЬ: Режимы и Профиль */}
      <div className="flex items-center gap-4">
        {/* Группа переключателей (Месяц, Неделя, День, Список) */}
        <div className="flex -space-x-px rounded-md shadow-sm">
          {viewModeToggle.map((view) => {
            const isActive = view.id === activeView;

            return (
              <Button
                key={view.id}
                type="button"
                disabled={view.isDisabled}
                // Меняем вариант в зависимости от активности
                variant={isActive ? 'secondary' : 'outline'}
                size="sm"
                onClick={() => { handleViewChange(view.id); }}
                className={cn(
                  'h-8 rounded-none px-3 font-medium transition-colors focus-visible:z-20',
                  // Скругление только внешних краев группы
                  'first:rounded-l-md last:rounded-r-md',
                  // Прячем двойные бордеры, накладывая кнопки друг на друга
                  'not-first:-ml-px',
                  // Специфичные стили для нажатой кнопки:
                  // Включаем z-10, чтобы её границы были четко видны поверх остальных кнопок,
                  // и отключаем клики
                  isActive && 'pointer-events-none z-10 border-black bg-black text-white hover:bg-black/90',
                )}
              >
                {view.label}
              </Button>
            );
          })}
        </div>

        {/* Иконка юзера (Отдельно) */}
        <Avatar className="ring-offset-background size-8 cursor-pointer transition-colors hover:opacity-80">
          <AvatarImage src="https://github.com" alt="User avatar" />
          <AvatarFallback>УЗ</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
