import type { Metadata } from 'next';

import { CalendarToolbar } from '@/features/admissions-calendar';

export const metadata: Metadata = {
  title: 'Календарь',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    // Контейнер на весь экран. overflow-hidden предотвращает общий скролл страницы
    <div className="bg-background flex h-screen w-full flex-col overflow-hidden">
      <CalendarToolbar />
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
}
