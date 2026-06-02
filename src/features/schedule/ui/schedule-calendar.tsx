'use client';

import { useState } from 'react';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { SlotSettings } from '@/features/dashboard/api.types';

import { Pin } from '../components/pin';
import { type GroupedSlots } from '../lib/grouped-slots';
import { formatTitleDate, getSlotTime, isCurrentSlot } from '../lib/slot-date-utils';
import { useSchedule } from '../provider/schedule-provider';

interface ComponentProps {
  initialGroupedSlots: GroupedSlots
  slotsSettings: SlotSettings
}

export function ScheduleCalendar({ initialGroupedSlots }: ComponentProps) {
  const [groupedSlots] = useState<GroupedSlots>(initialGroupedSlots);
  const { fontSize } = useSchedule();

  const spacing = fontSize / 14; // коэффициент

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
        {groupedSlots.map(([date, daySlots]) =>
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
