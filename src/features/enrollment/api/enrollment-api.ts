import { api } from '@/lib/api';
import { AppointmentVerifyResponse, type AppointmentPayload, type AppointmentVerifyPayload } from './types';
import { ActionPromisifyResult } from '@/lib/api.server';
import { extractApiError } from '@/lib/extract-api-error';

export const enrollmentApi = {
  getFreeSlot: async (params: { date: string, degreeId: string }, init?: RequestInit) => {
    return await api<{ slots: string[] }>(
      `/public/slots?booked=false&degreeId=${params.degreeId}&date=${params.date}`,
      init
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

  appointmentsVerify: async (payload: AppointmentVerifyPayload): ActionPromisifyResult<AppointmentVerifyResponse> => {
    try {
      const data = await api<AppointmentVerifyResponse>(
        `/public/appointments/verification`,
        {
          method: 'POST',
          body: JSON.stringify(payload),
        },
      );
      return { success: true, data };
    } catch (error) {
      const { status, message } = extractApiError(error);
      return { success: false, error: { status, message } };
    }
  },
};
