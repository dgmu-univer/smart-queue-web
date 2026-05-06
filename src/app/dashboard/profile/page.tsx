/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import UserProfile from '@/components/user-profile';
import api from '@/lib/api';

interface UserData {
  fio: string
  username: string
  email: string
  role: string
}
// app/profile/page.tsx
export default async function ProfilePage() {
  let userData = null;
  let error = null;

  try {
    const response = await api.get<UserData>('/public/me', {
      headers: {
        'Content-Type': 'application/json',
      },
      // Важно для серверного компонента
      cache: 'no-store',
    });

    if (response.ok) {
      userData = await response.json();
    } else {
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      error = `HTTP ${response.status}`;
    }
  } catch (err) {
    error = err instanceof Error ? err.message : 'Ошибка запроса';
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">
          Ошибка загрузки профиля:
          {' '}
          {error}
        </div>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-gray-500">Пользователь не авторизован</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mx-auto max-w-2xl overflow-hidden rounded-lg bg-white shadow-lg">
        <div className="bg-linear-to-r from-blue-500 to-blue-600 px-6 py-4">
          <h1 className="text-2xl font-bold text-white">Профиль пользователя</h1>
        </div>

        <UserProfile />

        <div className="p-6">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="rounded-lg bg-gray-50 p-4">
              <div className="text-sm text-gray-500">ФИО</div>
              <p className="text-lg font-semibold text-gray-800">{userData.fio}</p>
            </div>

            <div className="rounded-lg bg-gray-50 p-4">
              <div className="text-sm text-gray-500">Логин</div>
              <p className="text-lg font-semibold text-gray-800">{userData.username}</p>
            </div>

            <div className="rounded-lg bg-gray-50 p-4">
              <div className="text-sm text-gray-500">Email</div>
              <p className="text-lg font-semibold text-gray-800">{userData.email}</p>
            </div>

            <div className="rounded-lg bg-gray-50 p-4">
              <div className="text-sm text-gray-500">Роль</div>
              <div className="mt-1">
                <span className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ${
                  userData.role === 'ADMIN'
                    ? 'bg-purple-100 text-purple-800'
                    : 'bg-green-100 text-green-800'
                }`}
                >
                  {userData.role}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
