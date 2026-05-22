'use client';

import { useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { Trash2 } from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import {
  EmptyTableGradient,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow } from '@/components/ui/table';

import { removeDegreeProgram } from './actions';
import AddEducationLevel from './add-degree-programs';
import { DegreeProgramsItem } from './types';

export default function DegreeProgramsManager({ initailData }: { initailData: DegreeProgramsItem[] }) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  function handleDelete(id: number) {
    startTransition(async () => {
      const result = await removeDegreeProgram(id);
      if (result.success) {
        router.refresh();
        toast.success('Уровень образования успешно удален!');
      } else {
        toast.error(`Что-то пошло не так! (${result.error.status.toString()})`, {
          description: result.error.message,
          descriptionClassName: 'text-foreground',
        });
      }
    });
  }

  const isEmpty = initailData.length === 0;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <AddEducationLevel />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Наименование</TableHead>
              <TableHead className="w-3/5">Описание</TableHead>
              <TableHead>Пин код</TableHead>
              <TableHead className="w-25 text-right">Действия</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isEmpty && <EmptyTableGradient colSpan={4} />}
            { !isEmpty && initailData.map(degree => (
              <TableRow key={degree.id}>
                <TableCell data-id={degree.id} className="font-medium">{degree.name}</TableCell>
                <TableCell className="font-medium wrap-break-word whitespace-normal">{degree.description}</TableCell>
                <TableCell className="font-mono font-bold">{degree.pin}</TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    loading={isPending}
                    size="icon"
                    onClick={() => { handleDelete(degree.id); }}
                    className="text-destructive hover:text-destructive hover:bg-destructive/10"
                  >
                    <Trash2 className="size-4" />
                  </Button>
                </TableCell>
              </TableRow>
            )) }
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
