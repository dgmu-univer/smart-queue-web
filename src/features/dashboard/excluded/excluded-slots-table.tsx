'use client';

import { useState } from 'react';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

import { AddExcludedSlot } from './add-excluded-slot';
import { ExcludeSlotItem } from './types';

export default function ExludedSlotsTable({ initialData }: { initialData: ExcludeSlotItem<number>[] }) {
  const [data] = useState<ExcludeSlotItem<number>[]>(initialData);
  return (
    <Card className="bg-card/80 backdrop-blur-sm">
      <CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <CardTitle>Исключенные слоты</CardTitle>
        <CardDescription>
          <AddExcludedSlot />
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-1">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Дата</TableHead>
              <TableHead>Начало</TableHead>
              <TableHead>Конец</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map(date => (
              <TableRow key={date.date + date.end_time}>
                <TableCell className="font-medium">{date.date}</TableCell>
                <TableCell>{date.start_time}</TableCell>
                <TableCell>{date.end_time}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
