/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Table } from '@radix-ui/themes';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { cn } from '@/lib/utils';

const dates = [
  {
    date: '18 июля 2026',
    begin: '15:00',
    end: '16:00',
  },
  {
    date: '19 июля 2026',
    begin: '15:00',
    end: '16:00',
  },
  {
    date: '20 июля 2026',
    begin: '15:00',
    end: '16:00',
  },
  {
    date: '21 июля 2026',
    begin: '15:00',
    end: '16:00',
  },
  {
    date: '22 июля 2026',
    begin: '15:00',
    end: '16:00',
  },
  {
    date: '23 июля 2026',
    begin: '15:00',
    end: '16:00',
  },
  {
    date: '24 июля 2026',
    begin: '15:00',
    end: '16:00',
  },
  {
    date: '25 июля 2026',
    begin: '15:00',
    end: '16:00',
  },
  {
    date: '26 июля 2026',
    begin: '15:00',
    end: '16:00',
  },
  {
    date: '27 июля 2026',
    begin: '15:00',
    end: '16:00',
  },
  {
    date: '28 июля 2026',
    begin: '15:00',
    end: '16:00',
  },
];
// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const RadixTable = Table.Root as any;

// Схема валидации
const formSchema = z.object({
  date: z.date({ required_error: 'Выберите дату' }),
  startTime: z.string().min(1, 'Укажите время начала'),
  endTime: z.string().min(1, 'Укажите время окончания'),
});

export function AddSlotDialog() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      startTime: '09:00',
      endTime: '18:00',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    // Здесь логика сохранения
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost">Добавить</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-106.25">
        <DialogHeader>
          <DialogTitle>Добавить исключенный слот</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">

            {/* Дата */}
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Дата</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          className={cn(
                            'pl-3 text-left font-normal',
                            !field.value && 'text-muted-foreground',
                          )}
                        >
                          {field.value ? format(field.value, 'PPP') : <span>Выберите дату</span>}
                          <CalendarIcon className="ml-auto size-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Время начала и конца в один ряд */}
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="startTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Начало</FormLabel>
                    <FormControl>
                      <Input type="time" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="endTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Конец</FormLabel>
                    <FormControl>
                      <Input type="time" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button type="submit" className="w-full">Сохранить</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default function ExludedSlots() {
  return (
    <Card className="bg-card/80 backdrop-blur-sm">
      <CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <CardTitle>Исключенные слоты</CardTitle>
        <CardDescription>
          <AddSlotDialog />
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-1">
        <RadixTable>
          <TableHeader>
            <TableRow>
              <TableHead>Дата</TableHead>
              <TableHead>Начало</TableHead>
              <TableHead>Конец</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {dates.map(date => (
              <TableRow key={date.date + date.begin}>
                <TableCell className="font-medium">{date.date}</TableCell>
                <TableCell>{date.begin}</TableCell>
                <TableCell>{date.end}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </RadixTable>
      </CardContent>
    </Card>
  );
}
