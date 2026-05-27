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

export function CustomEventHorizontal({ event, mode }: EventProps<GroupedCalendarEvent> & { mode: ViewMode }) {
  const { pins, total, percentage } = useMemo(() => {
    const pinsList = event.pins;
    const totalCount = event.total || 0;
    const maxCapacity = 10;
    const percent = (totalCount / maxCapacity) * 100;

    return {
      pins: pinsList,
      total: totalCount,
      percentage: percent,
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
        <Total total={total} />
        {/* Прогресс-бар */}
        <ProgressBar percentage={percentage} />
        <Pins pins={pins} />

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
        <Total total={total} />
        {/* Прогресс-бар */}
        <ProgressBar percentage={percentage} />
        <Pins pins={pins} />

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
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '4px',
        fontSize: '10px',
        lineHeight: 1.2,
      }}
    >
      <Total total={total} />
      <ProgressBar percentage={percentage} />
      <span className="text-[12px]">
        {Math.round(percentage)}
        %
      </span>
    </div>
  );
}

const ProgressBar = ({ percentage }: { percentage: number }) => {
  return (
    <div className="h-1 w-8 rounded-full bg-black/20">
      <div
        className="h-full rounded-full bg-white/50"
        style={{ width: `${percentage.toString()}%`, background: getSlotColor(percentage) }}
      />
    </div>
  );
}

const Total = ({ total }: { total: number }) => {
  return (
    <span className="font-bold">
      {total}
      /10
    </span>
  );
}

const Pins = ({ pins }: { pins: string[] }) => {
  if (pins.length === 0) return null;
  return (
    <div>
      {pins.map((pin, index) => (
        <span key={index} className="text-[10px]">
          {pin}
        </span>
      ))}
    </div>
  );
}