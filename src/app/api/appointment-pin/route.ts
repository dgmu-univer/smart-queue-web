// app/api/appointment-pin/route.ts

import { NextResponse } from 'next/server';
import { verifyAppointmentToken } from '@/lib/appointment-token';

export async function POST(req: Request) {
  console.log('FFFFFFFFFFFFFFFFFF')
  try {
    const { token } = await req.json() as { token: string };

    const id = verifyAppointmentToken(token);

    console.log('IDDD', id)
    const response = await fetch(
      `${process.env.EXTERNAL_API_HOST}/api/public/appointments/${id.toString()}`,
      {
        cache: 'no-store',
      },
    );

    if (!response.ok) {
      return NextResponse.json(
        { error: 'Appointment not found' },
        { status: 404 },
      );
    }

    const data = await response.json() as { pin: string };

    return NextResponse.json({
      pin: data.pin,
    });
  } catch {
    return NextResponse.json(
      { error: 'Invalid token' },
      { status: 403 },
    );
  }
}
