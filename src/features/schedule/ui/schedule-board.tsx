'use client';

import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';

import { FetchScheduleResponse, FetchScheduleSlot } from '../api/types';
import { buildBoardData, type ScheduleBoardData } from '../lib/build-board';
import { getSlotTime } from '../lib/slot-date-utils';
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

  const { data } = useQuery<FetchScheduleResponse, Error, ScheduleBoardData>({
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

  return (
    <div className="grid h-full grid-cols-[2fr_1fr] gap-8">
      <CurrentSlot slot={data.current} />
      <NextSlots slots={data.next} />
    </div>
  );
}

function CurrentSlot({
  slot,
}: {
  slot?: FetchScheduleSlot
}) {
  if (!slot) {
    return (
      <div className="flex h-full items-center justify-center rounded-xl border">
        <span className="text-4xl">Нет активного слота</span>
      </div>
    );
  }

  return (
    <div className="bg-card flex h-full flex-col rounded-xl border">
      <div className="border-b py-6 text-center">
        <div className="text-2xl font-semibold">
          СЕЙЧАС
        </div>

        <div className="mt-2 text-4xl font-bold">
          {getSlotTime(slot)}
        </div>
      </div>

      <div className="flex-1 p-8">
        <div className="grid h-full grid-cols-4 gap-x-12 gap-y-6">
          {slot.pins.map(pin => (
            <div
              key={pin}
              className="text-center text-7xl font-bold tracking-wider"
            >
              {pin}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function NextSlots({
  slots,
}: {
  slots: FetchScheduleSlot[]
}) {
  return (
    <div className="rounded-xl border">
      <div className="border-b p-4 text-center text-xl font-semibold">
        Следующие
      </div>

      {slots.map(slot => (
        <div
          key={slot.start}
          className="border-b p-4 text-center text-3xl"
        >
          {getSlotTime(slot)}
        </div>
      ))}
    </div>
  );
}
