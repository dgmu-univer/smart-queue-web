import { TableCell, TableRow } from '@/components/ui/table';

export function EmptyData() {
  return (
    <TableRow>
      <TableCell
        colSpan={3}
        className="text-muted-foreground h-40 text-center"
      >
        Нет данных за выбранный день
      </TableCell>
    </TableRow>
  );
}
