'use client';

import { useState, useTransition } from 'react';
import { Trash2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  EmptyTableGradient
} from '@/components/ui/table';

import { removeDegreeProgram } from './actions';
import AddEducationLevel from './add-degree-programs';
import { DegreeProgramsItem } from './types';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

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
            { !isEmpty && initailData.map((degree) => (
              <TableRow key={degree.id}>
                <TableCell data-id={degree.id} className="font-medium">{degree.name}</TableCell>
                <TableCell className="font-medium whitespace-normal wrap-break-word">{degree.description}</TableCell>
                <TableCell className="font-mono font-bold">{degree.pin}</TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    loading={isPending}
                    size="icon"
                    onClick={() => { void handleDelete(degree.id); }}
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
