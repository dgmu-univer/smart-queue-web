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
        title="Предыдущие"
        time={data.previous.timeRanges}
        pins={data.previous.pins}
      />

      <BoardColumn
        variant="current"
        title="Сейчас"
        time={data.current.timeRanges}
        pins={data.current.pins}
      />

      <BoardColumn
        variant="next"
        title="Следующие"
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

export function BoardColumn({
  title,
  pins,
  variant,
  time,
}: Props) {
  const style = styles[variant];
  return (
    <div className="flex h-full flex-col">
      <div className={`p-4 text-center text-4xl font-bold ${style.header}`}>
        <h3 className="text-center text-4xl font-bold">{title}</h3>
        {time && time.length > 0
          ? (
              <span className="text-center text-2xl font-bold">
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
            className={`mb-4 break-inside-avoid text-center text-6xl font-bold ${style.text}`}
          >
            {pin}
          </div>
        ))}
      </div>
    </div>
  );
}
