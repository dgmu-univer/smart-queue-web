import { defineStepper } from '@stepperize/react';

export const { useStepper, steps, Scoped } = defineStepper(
  { id: 'booking', title: 'Данные', description: 'Заполните информацию' },
  { id: 'verification', title: 'Подтверждение', description: 'Введите код из СМС' },
  { id: 'confirmation', title: 'Готово', description: 'Запись подтверждена' },
);

export type UseStepper = ReturnType<typeof useStepper>;
