/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// app/components/UserProfile.tsx
'use client';

import { useEffect, useState } from 'react';

interface UserData {
  fio: string
  username: string
  email: string
  role: string
}

export default function UserProfile() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        console.log('🚀 Загрузка данных пользователя...');

        const response = await fetch('https://price05.ru/api/public/me', {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        console.log('📡 Статус ответа:', response.status);

        if (!response.ok) {
          throw new Error(`HTTP ошибка: ${response.status}`);
        }

        const data: UserData = await response.json();
        console.log('✅ Данные получены:', data);
        setUserData(data);
      } catch (err) {
        console.error('❌ Ошибка при загрузке:', err);
        setError(err instanceof Error ? err.message : 'Неизвестная ошибка');
      } finally {
        setLoading(false);
      }
    };

    void fetchUserData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-4">
        <div className="text-gray-600">Загрузка данных...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center p-4">
        <div className="text-red-600">
          Ошибка:
          {' '}
          {error}
        </div>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="flex items-center justify-center p-4">
        <div className="text-yellow-600">Данные пользователя не найдены</div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-md rounded-lg bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-2xl font-bold text-gray-800">Профиль пользователя</h2>
      Клиентский компонент
      <div className="space-y-3">
        <div className="border-b pb-2">
          <div className="font-semibold text-gray-600">ФИО:</div>
          <p className="mt-1 text-gray-800">{userData.fio}</p>
        </div>

        <div className="border-b pb-2">
          <div className="font-semibold text-gray-600">Логин:</div>
          <p className="mt-1 text-gray-800">{userData.username}</p>
        </div>

        <div className="border-b pb-2">
          <div className="font-semibold text-gray-600">Email:</div>
          <p className="mt-1 text-gray-800">{userData.email}</p>
        </div>

        <div className="border-b pb-2">
          <div className="font-semibold text-gray-600">Роль:</div>
          <p className="mt-1">
            <span className={`rounded-sm px-2 py-1 text-sm ${
              userData.role === 'ADMIN'
                ? 'bg-red-100 text-red-800'
                : 'bg-blue-100 text-blue-800'
            }`}
            >
              {userData.role}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
