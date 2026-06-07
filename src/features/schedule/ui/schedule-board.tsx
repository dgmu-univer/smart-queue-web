'use client';

import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';

import { FetchScheduleResponse } from '../api/types';
import { type BoardData, buildBoardData } from '../lib/build-board';
import { createMockBoardData } from '../lib/create-mock-board';
import { toScheduleRange } from '../lib/to-schedule-range';
import { useSchedule } from '../provider/schedule-provider';

interface ComponentProps {
  initialData: FetchScheduleResponse
}

export function formatTime(date: string) {
  return format(new Date(date), 'HH:mm');
}
export function ScheduleBoard({ initialData }: ComponentProps) {
  const { date } = useSchedule();
  const params = toScheduleRange(date);

  const { data, dataUpdatedAt } = useQuery<FetchScheduleResponse, Error, BoardData>({
    queryKey: ['slots', params],
    queryFn: ({ signal }) => fetch(`/api/appointments?to=${params.to}&from=${params.from}`, {
      headers: {
        'Content-Type': 'application/json',
      },
      signal,
    }).then(res => res.json()),
    initialData,
    staleTime: 0,
    select: data => buildBoardData(data.slots),
    refetchInterval: 60000, // 1 минута
    refetchOnWindowFocus: true,
  });
  const mockData = createMockBoardData();

  return (
    <div key={dataUpdatedAt} className="grid h-full grid-cols-3">
      <BoardColumn
        variant="previous"
        title="Предыдущие"
        time="17:10-18:00"
        pins={mockData.previous?.pins ?? []}
      />

      <BoardColumn
        variant="current"
        title="Сейчас"
        time="17:10-18:00"
        pins={mockData.current?.pins ?? []}
      />

      <BoardColumn
        variant="next"
        title="Следующие"
        time="17:10-18:00"
        pins={mockData.next?.pins ?? []}
      />
    </div>
  );
}

interface Props {
  title: string
  pins: string[]
  variant: BoardVariant
  time?: string
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
    header: 'bg-green-500 text-white',
    text: 'text-green-500',
  },
  next: {
    header: 'bg-blue-600 text-white',
    text: 'text-white',
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
        {time && <span className="text-center text-2xl font-bold">{time}</span>}
      </div>

      <div
        className={`flex-1 columns-3 gap-8 overflow-hidden p-6 ${variant === 'next' ? style.header : ''}`}
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
