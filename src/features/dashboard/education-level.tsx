'use client';

import React, { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from '@/components/ui/input-otp';
import { Label } from '@/components/ui/label';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface EducationLevel {
  id: string
  name: string
  pin: string
}

const DEFAULT_LEVELS: EducationLevel[] = [
  { id: '1', name: 'Колледж', pin: '12345678' },
  { id: '2', name: 'Специалитет', pin: '87654321' },
  { id: '3', name: 'Ординатура', pin: '55550000' },
];

export default function EducationLevelsManager() {
  const [items, setItems] = useState<EducationLevel[]>(DEFAULT_LEVELS);
  const [name, setName] = useState('');
  const [pin, setPin] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const handleSave = () => {
    if (name && pin.length === 8) {
      const newItem: EducationLevel = {
        id: crypto.randomUUID(),
        name,
        pin,
      };
      setItems([...items, newItem]);
      // Сброс формы
      setName('');
      setPin('');
      setIsOpen(false);
    }
  };

  const handleDelete = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="size-4" />
              {' '}
              Добавить
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Добавить уровень образования</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Наименование образования</Label>
                <Input
                  id="name"
                  placeholder="Напр: Колледж"
                  value={name}
                  onChange={(e) => { setName(e.target.value); }}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="pin">Пин код (8 знаков)</Label>
                <InputOTP
                  maxLength={8}
                  value={pin}
                  onChange={(value) => { setPin(value); }}
                >
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                  </InputOTPGroup>
                  <InputOTPSeparator />
                  <InputOTPGroup>
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                    <InputOTPSlot index={6} />
                    <InputOTPSlot index={7} />
                  </InputOTPGroup>
                </InputOTP>
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleSave} disabled={name.length === 0 || pin.length < 8}>
                Сохранить
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Наименование образования</TableHead>
              <TableHead>Пин код</TableHead>
              <TableHead className="w-[100px] text-right">Действия</TableHead>
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
                      <TableCell className="font-medium">{item.name}</TableCell>
                      <TableCell className="font-mono">{item.pin}</TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => { handleDelete(item.id); }}
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
