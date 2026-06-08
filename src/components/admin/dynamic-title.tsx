'use client';

import { useSearchParams } from 'next/navigation';

export function DynamicTitle() {
  const searchParams = useSearchParams();
  const name = searchParams.get('name');

  if (!name) return (
    <h1 className="text-foreground text-2xl font-semibold">
      Настройки уровня образования
    </h1>
  );

  return (
    <h1 className="text-foreground text-2xl font-semibold">
      {decodeURIComponent(name)}
      {' '}
      —
      {` `}
      управление настройками
    </h1>
  );
}
