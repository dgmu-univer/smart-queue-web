import { WorkDateSettings } from '@/features/dashboard/api.types';
import { GetDegreeResponseItem } from '@/features/dashboard/degree-manager/api/types';

export interface GetDegreeProgramsResponse {
  degreePrograms: GetDegreeResponseItem[]
  periodSettings: WorkDateSettings
}

export interface AppointmentPayload {
  date: string
  degreeId: number
  time: string
  phone: string
}

export interface AppointmentVerifyPayload {
  id: number
  verificationCode: string
}

export interface Slot {
  id: number
  degreeProgram: Omit<GetDegreeResponseItem, 'pin'>
  startTimeAt: string // ISO date
  endTimeAt: string // ISO date
}

export interface AppointmentVerifyResponse {
  id: number
  pin: string
  phone: string
  isVerified: boolean
  requestedAt: string // ISO date
  slot: Slot
}
