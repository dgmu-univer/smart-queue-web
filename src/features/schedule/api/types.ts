import { SlotSettings } from '@/features/dashboard/api.types';

export interface FetchScheduleParams {
  from: string
  to: string
}

export interface FetchScheduleSlot {
  start: string
  end: string
  pins: string[]
}
export interface FetchScheduleResponse {
  slotsSettings: SlotSettings
  slots: FetchScheduleSlot[]
}
