'use client';

import { useQuery } from '@tanstack/react-query';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { FetchScheduleResponse } from '../api/types';
import { EmptyData } from '../components/empty-data';
import { Pin } from '../components/pin';
import { ScheduleFallback } from '../components/schedule-fallback';
import { type GroupedSlots, groupedSlots } from '../lib/grouped-slots';
import { formatTitleDate, getSlotTime, isCurrentSlot } from '../lib/slot-date-utils';
import { toScheduleRange } from '../lib/to-schedule-range';
import { useSchedule } from '../provider/schedule-provider';

interface ComponentProps {
  initialData: FetchScheduleResponse
}

export function ScheduleCalendar({ initialData }: ComponentProps) {
  const { date } = useSchedule();
  const params = toScheduleRange(date);

  const { data, isFetching } = useQuery<FetchScheduleResponse, Error, GroupedSlots>({
    queryKey: ['slots', params],
    queryFn: ({ signal }) => fetch(`/api/appointments?to=${params.to}&from=${params.from}`, {
      headers: {
        'Content-Type': 'application/json',
      },
      signal,
    }).then(res => res.json()),
    initialData,
    staleTime: 0,
    select: data => groupedSlots(data.slots),
    refetchInterval: 60000, // 1 минута
    refetchOnWindowFocus: true,
  });

  const { fontSize } = useSchedule();

  const spacing = fontSize / 14; // коэффициент

  if (isFetching) {
    return <ScheduleFallback />;
  }

  return (
    <Table style={{
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      '--spacing': `${(0.25 * spacing).toString()}rem`, // базовый spacing 0.25rem
      'fontSize': `${fontSize.toString()}px`,
    }}
    >
      <TableHeader className="bg-background sticky top-0 z-10">
        <TableRow>
          <TableHead className="w-32">Дата</TableHead>
          <TableHead className="w-32">Время</TableHead>
          <TableHead className="min-w-100">Коды подтверждения</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.length === 0 && <EmptyData />}
        {data.length > 0 && data.map(([date, daySlots]) =>
          daySlots.map((slot, index) => (
            <TableRow
              key={slot.start}
              style={{
                backgroundColor: isCurrentSlot(slot) ? '#EAF8EA' : undefined,
              }}
            >
              {index === 0 && (
                <TableCell
                  style={{ verticalAlign: 'top' }}
                  rowSpan={daySlots.length}
                >
                  {formatTitleDate(date)}
                </TableCell>
              )}
              <TableCell>
                {getSlotTime(slot)}
              </TableCell>
              <TableCell>
                {slot.pins.map((pin, index) => (
                  <Pin key={index} pin={pin} />
                ))}
              </TableCell>
            </TableRow>
          )),
        )}
      </TableBody>
    </Table>
  );
}
