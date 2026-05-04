/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { type Metadata } from 'next';
import { getServerSession } from 'next-auth';

import { authOptions } from '@/lib/auth'; // путь к вашим опциям

export const metadata: Metadata = {
  title: 'Профиль — ДГМУ',
};

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);

  // Делаем запрос к внешнему сервису
  const response = await fetch('https://price05.ru/api/me', {
    method: 'GET',
    headers: {
      // Пробрасываем куку, которую получили при логине
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error

      Cookie: session.serverCookie,
    },
  });
  if (response.ok) {
    const data = await response.json();
    console.log(data);
  }
  console.log(response);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Профиль</h1>
        <p className="text-muted-foreground mt-1 text-sm">
          Информация о вашем аккаунте
        </p>
      </div>
    </div>
  );
}
