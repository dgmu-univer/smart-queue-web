// features/admissions-calendar/components/CustomEventHorizontal.tsx
'use client';

import { useMemo } from 'react';
import { EventProps } from 'react-big-calendar';

import { GroupedCalendarEvent, ViewMode } from '../model/types';

// Функция для определения цвета фона на основе процента заполненности
function getSlotColor(percentage: number): string {
  if (percentage === 0) return '#9ca3af'; // Серый - пустой
  if (percentage >= 90) return '#ef4444'; // Красный - почти полный
  if (percentage >= 70) return '#f59e0b'; // Оранжевый - средний
  if (percentage >= 50) return '#eab308'; // Жёлтый
  return '#10b981'; // Зелёный
}

// Функция для получения градиента с процентом
function getGradientBackground(percentage: number): string {
  const color = getSlotColor(percentage);
  return `linear-gradient(90deg, ${color} ${percentage}%, rgba(255,255,255,0.15) ${percentage}%)`;
}

// Форматирование времени
function formatTime(date: Date): string {
  return date.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
}

export function CustomEventHorizontal({ event, mode }: EventProps<GroupedCalendarEvent> & { mode: ViewMode }) {
  const { pins, total, percentage, hasPins } = useMemo(() => {
    const pinsList = event.pins || [];
    const totalCount = event.total || 0;
    const maxCapacity = 10;
    const percent = (totalCount / maxCapacity) * 100;

    return {
      pins: pinsList,
      total: totalCount,
      percentage: percent,
      hasPins: pinsList.length > 0,
    };
  }, [event]);

  const isEmpty = total === 0;
  const isDetailedMode = mode === 'day' || mode === 'agenda';

  // Agenda режим: горизонтальное отображение
  if (mode === 'agenda') {
    return (
      <div
        className="rbc-event-content"
        style={{
          // background: getGradientBackground(percentage),
          borderRadius: '4px',
          padding: '0 8px',
          color: 'black',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          fontSize: '12px',
          lineHeight: 1.2,
        }}
      >
        {/* Заполненность */}
        <div className="shrink-0 text-sm font-bold">
          {total}
          /10
        </div>

        {/* Прогресс-бар */}
        <div className="h-1 w-12 shrink-0 rounded-full bg-black/20">
          <div
            className="h-full rounded-full bg-white/50"
            style={{ width: `${percentage}%`, background: getGradientBackground(percentage) }}
          />
        </div>

        {/* PIN-коды (только для day и agenda) */}
        {isDetailedMode && hasPins && (
          <div className="flex min-w-0 flex-1 flex-wrap gap-1">
            {pins.map((pin, idx) => (
              <span
                key={idx}
                className="shrink-0 rounded-sm border border-black/20 px-1 py-0 font-mono text-[18px]"
              >
                {pin}
              </span>
            ))}
          </div>
        )}

        {/* Пустой слот */}
        {isDetailedMode && isEmpty && (
          <div className="text-xs opacity-80">Свободно</div>
        )}
      </div>
    );
  }

  // Day режим: горизонтальное отображение (без вертикальных отступов)
  if (mode === 'day') {
    return (
      <div
        className="rbc-event-content"
        style={{
          // background: getGradientBackground(percentage),
          borderRadius: '4px',
          padding: '0 6px',
          color: 'black',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          fontSize: '10px',
          lineHeight: 1.2,
        }}
      >
        {/* Заполненность */}
        <div className="shrink-0 text-xs font-bold">
          {total}
          /10
        </div>

        {/* Прогресс-бар */}
        <div className="h-1 w-10 shrink-0 rounded-full bg-black/20">
          <div
            className="h-full rounded-full bg-white/50"
            style={{ width: `${percentage}%`, background: getGradientBackground(percentage) }}
          />
        </div>

        {/* PIN-коды */}
        {hasPins && (
          <div className="flex min-w-0 flex-1 flex-wrap gap-0.5">
            {pins.map((pin, idx) => (
              <span
                key={idx}
                className="shrink-0 rounded-sm border border-black/20 px-1 py-0 font-mono text-[12px]"
              >
                {pin}
              </span>
            ))}
          </div>
        )}

        {/* Пустой слот */}
        {isEmpty && (
          <div className="text-[10px] opacity-80">Свободно</div>
        )}
      </div>
    );
  }

  // Month и Week режимы: компактное горизонтальное отображение
  return (
    <div
      className="rbc-event-content"
      style={{
        // background: getGradientBackground(percentage),
        borderRadius: '4px',
        padding: '0 4px',
        color: 'black',
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '4px',
        fontSize: '10px',
        lineHeight: 1.2,
      }}
    >
      {/* Время */}
      {mode === 'month' && (
        <div className="shrink-0 font-mono text-xs font-semibold opacity-90">
          {formatTime(event.start)}
          –
          {formatTime(event.end)}
        </div>
      )}
      <span className="font-bold">
        {total}
        /10
      </span>
      <div className="h-1 w-8 rounded-full bg-black/20">
        <div
          className="h-full rounded-full bg-white/50"
          style={{ width: `${percentage}%`, background: getGradientBackground(percentage) }}
        />
      </div>
      <span className="text-[12px]">
        {Math.round(percentage)}
        %
      </span>
    </div>
  );
}
