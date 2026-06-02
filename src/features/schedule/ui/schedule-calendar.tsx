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

import { FetchScheduleResponse, FetchScheduleSlot } from '../api/types';
import { Pin } from '../components/pin';
import { groupedSlots } from '../lib/grouped-slots';
import { formatTitleDate, getSlotTime, isCurrentSlot } from '../lib/slot-date-utils';
import { useSchedule } from '../provider/schedule-provider';

export function ScheduleCalendar({ initSchedule }: { initSchedule: FetchScheduleResponse }) {
  const [schedule] = useState<FetchScheduleSlot[]>(initSchedule.slots);
  const { fontSize } = useSchedule();

  const grouped = groupedSlots(schedule);
  const spacing = fontSize / 14; // коэффициент

  return (
    <Table style={{
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
        {grouped.map(([date, daySlots]) =>
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
              <TableCell className="bg-amber-500">
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
