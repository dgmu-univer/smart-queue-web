'use client';

import { useEffect, useRef } from 'react';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { cn } from '@/lib/utils';

import { FetchScheduleResponse } from '../api/types';
import { EmptyData } from '../components/empty-data';
import { Pin } from '../components/pin';
import { useQuerySchedule } from '../hooks/use-query-schedule';
import { type GroupedSlots, groupedSlots } from '../lib/grouped-slots';
import { formatTitleDate, getSlotTime, isCurrentSlot } from '../lib/slot-date-utils';
import { useSchedule } from '../provider/schedule-provider';

interface ComponentProps {
  initialData: FetchScheduleResponse
}

export function ScheduleCalendar({ initialData }: ComponentProps) {
  const { data, dataUpdatedAt } = useQuerySchedule<GroupedSlots>({
    selectCallback: groupedSlots,
    initialData,
  });

  const { fontSize } = useSchedule();
  const currentSlotRef = useRef<HTMLTableRowElement>(null);
  const hasScrolledRef = useRef(false);

  const spacing = fontSize / 14;

  // Функция для прокрутки к текущему слоту
  const scrollToCurrentSlot = () => {
    if (currentSlotRef.current) {
      currentSlotRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  };

  // Прокрутка при первой загрузке и при обновлении данных
  useEffect(() => {
    if (data.length > 0) {
      // Небольшая задержка для гарантии отрисовки DOM
      const timeoutId = setTimeout(() => {
        scrollToCurrentSlot();
        hasScrolledRef.current = true;
      }, 100);

      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [data, dataUpdatedAt]);

  return (
    <Table style={{
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      '--spacing': `${(0.25 * spacing).toString()}rem`,
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
      <TableBody key={dataUpdatedAt}>
        {data.length === 0 && <EmptyData />}
        {data.length > 0 && data.map(([date, daySlots]) =>
          daySlots.map((slot, index) => {
            const isCurrent = isCurrentSlot(slot);
            return (
              <TableRow
                key={slot.start}
                ref={isCurrent ? currentSlotRef : null}
                className={cn(
                  'text-slate-300',
                  isCurrent && 'text-foreground bg-blue-400 hover:bg-blue-500',
                )}
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
                  <Pin pin={getSlotTime(slot)} />
                </TableCell>
                <TableCell>
                  {slot.pins.map((pin, index) => (
                    <Pin key={index} pin={pin} />
                  ))}
                </TableCell>
              </TableRow>
            );
          }),
        )}
      </TableBody>
    </Table>
  );
}
