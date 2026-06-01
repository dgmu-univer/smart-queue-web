import { apiServer } from '@/lib/api.server';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;

  const degreeId = searchParams.get('degreeId');
  const date = searchParams.get('date');

  const params = new URLSearchParams();

  if (degreeId) {
    params.set('degreeId', degreeId);
  }

  if (date) {
    params.set('date', date);
  }

  try {
    const data = await apiServer<{ appointmentsCount: number }>(
      `/statistics${params.size ? `?${params.toString()}` : ''}`,
      {
        method: 'GET',
      },
    );

    return NextResponse.json({ success: true, value: data.appointmentsCount }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
