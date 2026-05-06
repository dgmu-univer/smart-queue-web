/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// app/components/UserProfile.tsx
'use client';

import { api } from '@/lib/api';
import { useEffect, useState } from 'react';

interface UserData {
  name: 'name'
  description: 'description'
}

export default function UserProfile() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        console.log('🚀 Загрузка данных пользователя...');

        const response = await api<UserData>('/public/mock', {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        setUserData(response);
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
      <div className="p-6">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="rounded-lg bg-gray-50 p-4">
            <div className="text-sm text-gray-500">ФИО</div>
            <p className="text-lg font-semibold text-gray-800">{userData.description}</p>
          </div>
          <div className="rounded-lg bg-gray-50 p-4">
            <div className="text-sm text-gray-500">ФИО</div>
            <p className="text-lg font-semibold text-gray-800">{userData.name}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
