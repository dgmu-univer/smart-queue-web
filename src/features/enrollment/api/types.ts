import { WorkDateSettings } from '@/features/dashboard/api.types';

export interface Slot {
  id: number
  startTimeAt: string
  endTimeAt: string
}

export interface DegreeListItem {
  id: number
  name: string
  description?: string
  periodSettings: WorkDateSettings
}

export interface FetchDegreeListResponse {
  degreePrograms: DegreeListItem[]
}

export interface CreateEnrollmentPayload {
  date: string
  degreeId: number
  time: string
  phone: string
}

export interface ExistingEnrollmentPayload {
  degreeId: number
  phone: string
}

export interface VerifyOtpPayload {
  id: number
  verificationCode: string
}

export interface VerifyOtpResponse {
  id: number
  pin: string
  phone: string
  isVerified: boolean
  requestedAt: string
  slot: Slot
  degree: Pick<DegreeListItem, 'name' | 'description'>
}
