'use client';

import { useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { Trash2 } from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
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

import { WithLevelId } from '../../../api.types';
import { deleteExcludedSlot } from '../api/delete-excluded-slot';
import { FetchExcludedSlotsResponse } from '../api/types';
import { CreateExcludedSlot } from './create-excluded-slot';

type ComponentProps = WithLevelId<{ initialData: FetchExcludedSlotsResponse }>;

export default function ExcludedSlotsTable({ initialData, levelId }: ComponentProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleDelete = (slotId: number) => {
    startTransition(async () => {
      const result = await deleteExcludedSlot(levelId, slotId.toString());
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
    <Card className="border-border border shadow-none">
      <CardHeader>
        <div className="flex items-center justify-between">
          <h2 className="text-foreground text-base font-semibold">Исключённые слоты</h2>
          <CreateExcludedSlot levelId={levelId} />
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="text-muted-foreground text-xs font-medium">Дата</TableHead>
              <TableHead className="text-muted-foreground text-xs font-medium">Начало</TableHead>
              <TableHead className="text-muted-foreground text-xs font-medium">Конец</TableHead>
              <TableHead className="text-muted-foreground w-24 text-right text-xs font-medium">Действия</TableHead>
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
                    loading={isPending}
                    onClick={() => { handleDelete(slot.id); }}
                    variant="ghost"
                    size="icon"
                    className="text-muted-foreground hover:text-destructive size-7"
                  >
                    <Trash2 className="size-3.5" />
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
