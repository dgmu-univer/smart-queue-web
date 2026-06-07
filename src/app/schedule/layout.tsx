import { Metadata } from 'next';

import { ScheduleProvider } from '@/features/schedule';

export const metadata: Metadata = {
  title: `- Расписание`,
  description: 'Расписание для оператора',
};

export default function ScheduleLayout({ children }: { children: React.ReactNode }) {
  return (
    <ScheduleProvider>
      {children}
    </ScheduleProvider>
  );
}
