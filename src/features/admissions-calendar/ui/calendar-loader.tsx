import React from 'react';
import { Calendar, Loader2 } from 'lucide-react';

export function CalendarSkeletonSpinner() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-transparent">

      {/* Контейнер для спиннера и иконки */}
      <div className="relative mb-3 flex items-center justify-center">
        {/* Вращающийся спиннер вокруг */}
        <Loader2 className="size-14 animate-spin text-blue-500 dark:text-blue-400" />

        {/* Неподвижный календарь строго по центру */}
        <Calendar className="absolute size-6 text-slate-600 dark:text-slate-400" />
      </div>

      {/* Текст загрузки */}
      <p className="animate-pulse text-sm font-medium tracking-wide text-slate-500 dark:text-slate-400">
        Загрузка календаря...
      </p>

    </div>
  );
}
