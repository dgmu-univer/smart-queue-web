'use client';

import { defineStepper } from '@stepperize/react';

export const { useStepper, steps } = defineStepper(
  { id: 'details', title: 'Данные', description: 'Заполните информацию' },
  { id: 'otp', title: 'Подтверждение', description: 'Введите код из СМС' },
  { id: 'success', title: 'Готово', description: 'Запись подтверждена' },
);
