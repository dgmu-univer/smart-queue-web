import { api } from '@/lib/api';

export const enrollmentApi = {
  getFreeSlot: async (params: { date: string, degreeId: string }) => {
    return await api<{ slots: string[] }>(
      `/public/slots?booked=false&degreeId=${params.degreeId}&date=${params.date}`,
    );
  },
};
