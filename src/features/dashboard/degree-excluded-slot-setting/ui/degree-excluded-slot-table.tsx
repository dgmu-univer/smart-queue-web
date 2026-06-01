'use client';

import { useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { Trash2 } from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  EmptyTableGradient,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { WithDegreeId } from '../../api.types';
import { deleteExcludedSlot } from '../api/delete-excluded-slot';
import { FetchExcludedSlotsResponse } from '../api/types';
import { CreateExcludedSlot } from './create-excluded-slot';

type ComponentProps = WithDegreeId<{ initialData: FetchExcludedSlotsResponse }>;

export default function ExcludedSlotsTable({ initialData, degreeId }: ComponentProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleDelete = (slotId: number) => {
    startTransition(async () => {
      const result = await deleteExcludedSlot(degreeId, slotId.toString());
      if (result.success) {
        toast.success('Исключенный слот успешно удален!');
        router.refresh();
      } else {
        toast.error(`Что-то пошло не так! (${result.error.status.toString()})`, {
          description: result.error.message,
          descriptionClassName: 'text-foreground',
        });
      }
    });
  };

  const isEmpty = initialData.length === 0;
  return (
    <Card className="bg-card/80 backdrop-blur-sm">
      <CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <CardTitle>Исключенные слоты</CardTitle>
        <CardDescription>
          <CreateExcludedSlot degreeId={degreeId} />
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-1">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Дата</TableHead>
              <TableHead>Начало</TableHead>
              <TableHead>Конец</TableHead>
              <TableHead className="w-25 text-right">Действия</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isEmpty && <EmptyTableGradient colSpan={4} />}
            {!isEmpty && initialData.map(slot => (
              <TableRow key={slot.id}>
                <TableCell className="font-medium">
                  {slot.date}
                </TableCell>
                <TableCell>{slot.start_time}</TableCell>
                <TableCell>{slot.end_time}</TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    loading={isPending}
                    size="icon"
                    onClick={() => { handleDelete(slot.id); }}
                    className="text-destructive hover:text-destructive hover:bg-destructive/10"
                  >
                    <Trash2 className="size-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
