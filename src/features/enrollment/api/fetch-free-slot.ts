import { api } from '@/lib/api';

interface FetchFreeSlotParams {
  date: string
  degreeId: string
}

export async function fetchFreeSlot(params: FetchFreeSlotParams, init?: RequestInit): Promise<{ slots: string[] }> {
  return await api<{ slots: string[] }>(
    `/public/slots?booked=false&degreeId=${params.degreeId}&date=${params.date}`,
    { ...init },
  );
}
