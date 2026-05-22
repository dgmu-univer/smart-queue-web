import { DegreeProgramsItem } from '@/features/dashboard/degree-programs';
import { WorkDateObject } from '@/features/dashboard/main-settings';

export interface GetDegreeProgramsResponse {
  degreePrograms: DegreeProgramsItem[]
  periodSettings: WorkDateObject
}

export interface AppointmentPayload {
  date: string
  degreeId: number
  time: string
  phone: string
}

export interface AppointmentVerifyPayload {
  id: number
  phone: string
}

export interface AppointmentVerifyPayload {
  id: number
  phone: string
}

export interface Slot {
  id: number
  degreeProgram: Omit<DegreeProgramsItem, 'pin'>
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
