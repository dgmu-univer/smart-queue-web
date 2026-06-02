import { fetchSchedule } from '@/features/schedule';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const signal = request.signal;

  const to = searchParams.get('to') ?? '';
  const from = searchParams.get('from') ?? '';

  try {
    const data = await fetchSchedule({ to, from }, false, { signal });

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    // Обрабатываем abort ошибку
    if (error instanceof Error && error.name === 'AbortError') {
      return NextResponse.json({ error: 'Request aborted' }, { status: 499 });
    }

    console.error(error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
