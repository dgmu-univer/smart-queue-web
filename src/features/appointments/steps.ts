'use client';

import { defineStepper } from '@stepperize/react';

// type Steps = [
//   { id: string, title: string, description: string },
//   { id: string, title: string, description: string, verifyId?: string },
//   { id: string, title: string, description: string, data?: Record<string, any> },
// ];

export const { useStepper, steps } = defineStepper(
  { id: 'details', title: 'Данные', description: 'Заполните информацию' },
  { id: 'otp', title: 'Подтверждение', description: 'Введите код из СМС' },
  { id: 'success', title: 'Готово', description: 'Запись подтверждена' },
);
