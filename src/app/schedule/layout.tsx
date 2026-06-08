import { Metadata } from 'next';
import { getServerSession } from 'next-auth';

import { ScheduleProvider } from '@/features/schedule';
import { authOptions } from '@/lib/auth';

export async function generateMetadata(): Promise<Metadata> {
  // Получаем данные пользователя (способ зависит от вашей аутентификации)
  const session = await getServerSession(authOptions);

  let username = '';
  if (session) {
    username = session.user.fio;
  }

  return {
    title: username ? `${username} - Расписание` : 'Расписание',
    description: 'Расписание для оператора',
  };
}
export default function ScheduleLayout({ children }: { children: React.ReactNode }) {
  return (
    <ScheduleProvider>
      {children}
    </ScheduleProvider>
  );
}
