'use client';

import { format } from 'date-fns';

import { FetchScheduleResponse } from '../api/types';
import { useQuerySchedule } from '../hooks/use-query-schedule';
import { BoardData, buildBoardData } from '../lib/build-board';

interface ComponentProps {
  initialData: FetchScheduleResponse
}

export function formatTime(date: string) {
  return format(new Date(date), 'HH:mm');
}
export function ScheduleBoard({ initialData }: ComponentProps) {
  const { data, dataUpdatedAt } = useQuerySchedule<BoardData>({
    selectCallback: buildBoardData,
    initialData,
  });

  return (
    <div key={dataUpdatedAt} className="grid h-full grid-cols-3">
      <BoardColumn
        variant="previous"
        title="Предыдущий"
        time={data.previous.timeRanges}
        pins={data.previous.pins}
      />

      <BoardColumn
        variant="current"
        title="Текущий слот"
        time={data.current.timeRanges}
        pins={data.current.pins}
      />

      <BoardColumn
        variant="next"
        dataUpdatedAt={dataUpdatedAt}
        title="Следующий"
        time={data.next.timeRanges}
        pins={data.next.pins}
      />
    </div>
  );
}

interface Props {
  title: string
  pins: string[]
  variant: BoardVariant
  time?: string[]
  dataUpdatedAt?: number
}

type BoardVariant = 'previous' | 'current' | 'next';

const styles: Record<
  BoardVariant,
  {
    header: string
    text: string
  }
> = {
  previous: {
    header: 'bg-slate-300 text-white',
    text: 'text-slate-300',
  },
  current: {
    header: 'bg-blue-400 text-white',
    text: 'text-blue-400',
  },
  next: {
    header: 'bg-slate-300 text-white',
    text: 'text-slate-300',
  },
};

const getFontSize = (min: number, max: number, minScreen = 320, maxScreen = 3840) => {
  // clamp(min, (max-min) * (100vw - minScreen)/(maxScreen - minScreen) + min, max)
  return `clamp(${min}rem, ${(max - min) * 100}vw / ${maxScreen - minScreen} + ${min}rem, ${max}rem)`;
};

export function BoardColumn({
  title,
  pins,
  variant,
  time,
  dataUpdatedAt,
}: Props) {
  const style = styles[variant];
  return (
    <div className="relative flex h-full flex-col">
      {dataUpdatedAt && (
        <span className="absolute top-1 right-1 text-xs text-gray-400">
          {`Обновлено: ${format(new Date(dataUpdatedAt), 'HH:mm')}`}
        </span>
      )}
      <div className={`p-2 text-center font-bold ${style.header}`} style={{ minHeight: '82px' }}>
        <h3 className="text-center text-3xl font-bold">{title}</h3>
        {time && time.length > 0
          ? (
              <span className="ext-center font-bold" style={{ fontSize: getFontSize(1.5, 4) }}>
                {time.join(', ')}
              </span>
            )
          : (
              <span className="text-center text-2xl font-bold">
                Записей нет
              </span>
            )}
      </div>

      <div
        className={`flex-1 columns-3 gap-8 overflow-hidden p-6 ${variant === 'next' ? '' : ''}`}
      >
        {pins.map(pin => (
          <div
            key={pin}
            className={`mb-4 break-inside-avoid text-left text-3xl font-bold ${style.text}`}
          >
            {pin}
          </div>
        ))}
      </div>
    </div>
  );
}
