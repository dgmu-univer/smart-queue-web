import { apiServer } from '@/lib/api.server';
import { NextResponse } from 'next/server';

export async function PATCH(request: Request) {
  try {
    // 2. Получение данных из тела запроса
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const body = await request.json();

    await apiServer('/admin-settings/periods', {
      method: 'PATCH',
      body: JSON.stringify(body),
    });
    // 4. Успешный ответ
    return NextResponse.json({ success: true, message: 'Periods updated' }, { status: 200 });
  } catch (error) {
    console.error('Route Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
