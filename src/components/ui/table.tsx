'use client';

import * as React from 'react';
import { Inbox, Plus } from 'lucide-react';

import { cn } from '@/lib/utils';

import { Button } from './button';

function Table({ className, ...props }: React.ComponentProps<'table'>) {
  return (
    <div
      data-slot="table-container"
      className="relative w-full overflow-x-auto"
    >
      <table
        data-slot="table"
        className={cn('w-full caption-bottom text-sm', className)}
        {...props}
      />
    </div>
  );
}

function TableHeader({ className, ...props }: React.ComponentProps<'thead'>) {
  return (
    <thead
      data-slot="table-header"
      className={cn('[&_tr]:border-b', className)}
      {...props}
    />
  );
}

function TableBody({ className, ...props }: React.ComponentProps<'tbody'>) {
  return (
    <tbody
      data-slot="table-body"
      className={cn('[&_tr:last-child]:border-0', className)}
      {...props}
    />
  );
}

function TableFooter({ className, ...props }: React.ComponentProps<'tfoot'>) {
  return (
    <tfoot
      data-slot="table-footer"
      className={cn(
        'bg-muted/50 border-t font-medium [&>tr]:last:border-b-0',
        className,
      )}
      {...props}
    />
  );
}

function TableRow({ className, ...props }: React.ComponentProps<'tr'>) {
  return (
    <tr
      data-slot="table-row"
      className={cn(
        'hover:bg-muted/50 has-aria-expanded:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors',
        className,
      )}
      {...props}
    />
  );
}

function TableHead({ className, ...props }: React.ComponentProps<'th'>) {
  return (
    <th
      data-slot="table-head"
      className={cn(
        'text-foreground h-10 px-2 text-left align-middle font-medium whitespace-nowrap [&:has([role=checkbox])]:pr-0 *:[[role=checkbox]]:translate-y-[2px]',
        className,
      )}
      {...props}
    />
  );
}

function TableCell({ className, ...props }: React.ComponentProps<'td'>) {
  return (
    <td
      data-slot="table-cell"
      className={cn(
        'p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 *:[[role=checkbox]]:translate-y-[2px]',
        className,
      )}
      {...props}
    />
  );
}

function TableCaption({
  className,
  ...props
}: React.ComponentProps<'caption'>) {
  return (
    <caption
      data-slot="table-caption"
      className={cn('text-muted-foreground mt-4 text-sm', className)}
      {...props}
    />
  );
}

interface EmptyTableProps {
  colSpan?: number
  title?: string
  description?: string
  onAction?: () => void
  actionLabel?: string
}

function EmptyTableGradient({
  colSpan = 3,
  title = 'Нет данных',
  description = 'Здесь пока ничего нет. Добавьте первый элемент, чтобы начать работу.',
  onAction,
  actionLabel = 'Добавить',
}: EmptyTableProps) {
  return (
    <TableRow>
      <TableCell colSpan={colSpan} className="text-muted-foreground py-10 text-center">
        <div className="`min-h-50 flex w-full flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
          <div className="bg-muted/50 mx-auto flex size-20 items-center justify-center rounded-full">
            <Inbox className="text-muted-foreground size-10" />
          </div>
          <h3 className="mt-4 text-lg font-semibold">{title}</h3>
          <p className="text-muted-foreground mt-2 mb-4 max-w-sm text-sm">
            {description}
          </p>
          {onAction && (
            <Button onClick={onAction} size="sm">
              <Plus className="mr-2 size-4" />
              {actionLabel}
            </Button>
          )}
        </div>
      </TableCell>
    </TableRow>

  );
}

export {
  EmptyTableGradient,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
};
