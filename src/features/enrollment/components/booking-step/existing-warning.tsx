import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface ExistingWarningProps {
  onConfirm: () => void
  onCancel: () => void
  isOpen: boolean
}

export function ExistingWarning({ onConfirm, onCancel, isOpen }: ExistingWarningProps) {
  return (
    <Dialog open={isOpen} onOpenChange={() => { onCancel(); }}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Найден дубликат записи</DialogTitle>
        </DialogHeader>
        <p className="mb-4 text-sm/normal">
          Этот номер телефона уже используется в системе. Если вы продолжите, старая запись будет автоматически удалена, а текущие данные перезапишут новыми. Продолжить?
        </p>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" onClick={onCancel}>Отмена</Button>
          </DialogClose>
          <Button type="button" onClick={onConfirm}>Перезаписать и продолжить</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
