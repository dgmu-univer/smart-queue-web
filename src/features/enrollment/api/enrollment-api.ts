import { api } from '@/lib/api';
import { AppointmentVerifyResponse, type AppointmentPayload, type AppointmentVerifyPayload } from './types';

export const enrollmentApi = {
  getFreeSlot: async (params: { date: string, degreeId: string }, init?: RequestInit) => {
    return await api<{ slots: string[] }>(
      `/public/slots?booked=false&degreeId=${params.degreeId}&date=${params.date}`,
      init,
    );
  },

  appointments: async (payload: AppointmentPayload) => {
    return await api<number>(
      `/public/appointments`,
      {
        method: 'POST',
        body: JSON.stringify(payload),
      },
    );
  },

  appointmentsVerify: async (payload: AppointmentVerifyPayload) => {
    return await api<AppointmentVerifyResponse>(
      `/public/appointments/verification`,
      {
        method: 'POST',
        body: JSON.stringify(payload),
      },
    );
  },
};
