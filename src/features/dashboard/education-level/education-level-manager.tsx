'use client';

import { useState } from 'react';
import { Trash2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { deleteEducationLevel } from './actions';
import AddEducationLevel from './add-education-level';
import { EducationLevelItem } from './types';

export default function EducationLevelManager({ initailData }: { initailData: EducationLevelItem[] }) {
  const [items, setItems] = useState<EducationLevelItem[]>(initailData);
  const [isPending, setIsPending] = useState(false);

  const handleDelete = async (id: number) => {
    try {
      setIsPending(true);
      await deleteEducationLevel(id.toString());
      setItems(items.filter(item => item.id !== id));
    } catch (error) {
      console.error(error);
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <AddEducationLevel />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Наименование</TableHead>
              <TableHead>Описание</TableHead>
              <TableHead>Пин код</TableHead>
              <TableHead className="w-25 text-right">Действия</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.length === 0
              ? (
                  <TableRow>
                    <TableCell colSpan={3} className="text-muted-foreground py-10 text-center">
                      Список пуст. Добавьте первый уровень образования.
                    </TableCell>
                  </TableRow>
                )
              : (
                  items.map(item => (
                    <TableRow key={item.id}>
                      <TableCell data-id={item.id} className="font-medium">{item.name}</TableCell>
                      <TableCell className="font-medium">{item.description}</TableCell>
                      <TableCell className="font-mono">{item.pin}</TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          loading={isPending}
                          size="icon"
                          onClick={() => { void handleDelete(item.id); }}
                          className="text-destructive hover:text-destructive hover:bg-destructive/10"
                        >
                          <Trash2 className="size-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
