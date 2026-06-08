'use client';

import { useTransition } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Settings, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow } from '@/components/ui/table';

import { deleteEducationLevel } from '../api/delete-edu-level';
import { EducationLevel } from '../api/types';
import CreateNewEducationLevel from './create-new-level';

export const EducationLevelTable = ({ initialLevels }: { initialLevels: EducationLevel[] }) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  function handleDelete(id: number) {
    startTransition(async () => {
      const result = await deleteEducationLevel(id);
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

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-foreground text-base font-semibold">Уровни образования</h2>
        <CreateNewEducationLevel />
      </div>

      <div className="border-border bg-card rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="text-muted-foreground text-xs font-medium">Наименование</TableHead>
              <TableHead className="text-muted-foreground text-xs font-medium">Описание</TableHead>
              <TableHead className="text-muted-foreground text-xs font-medium">Пин код</TableHead>
              <TableHead className="text-muted-foreground w-24 text-right text-xs font-medium">Действия</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {initialLevels.map(level => (
              <TableRow key={level.id} className="hover:bg-muted/40">
                <TableCell className="text-foreground py-3 text-sm font-medium">
                  {level.name}
                </TableCell>
                <TableCell className="text-muted-foreground py-3 text-sm">
                  {level.description}
                </TableCell>
                <TableCell className="text-foreground py-3 font-mono text-sm font-medium">
                  {level.pin}
                </TableCell>
                <TableCell className="py-3 text-right">
                  <div className="flex items-center justify-end gap-1">
                    <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground size-7" asChild>
                      <Link href={`/admin/education-level/${level.id.toString()}?name=${encodeURIComponent(level.name)}`}>
                        <Settings className="size-3.5" />
                        <span className="sr-only">Настройки</span>
                      </Link>
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-destructive size-7">
                          <Trash2 className="size-3.5" />
                          <span className="sr-only">Удалить</span>
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Удалить уровень?</AlertDialogTitle>
                          <AlertDialogDescription>
                            Уровень &quot;
                            {level.name}
                            &quot; будет удалён. Это действие необратимо.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Отмена</AlertDialogCancel>
                          <AlertDialogAction
                            loading={isPending}
                            onClick={() => { handleDelete(level.id); }}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                          >
                            Удалить
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
