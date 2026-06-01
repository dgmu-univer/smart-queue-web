export interface PeriodSetting {
  work_date: WorkDateSettings
  work_time: WorkTimeSettings
  lunch: LunchSettings | null
}

export interface WorkDateSettings {
  start_date: string
  end_date: string
}

export interface WorkTimeSettings {
  start_time: string
  end_time: string
}

export interface LunchSettings {
  start_time?: string
  end_time?: string
}

export interface SlotSettings {
  duration_minutes: number
  capacity_per_slot: number
}

export interface ExcludedSlotSettings {
  id: number
  date: string
  start_time: string
  end_time: string
}

export interface DegreeIdParams { params: Promise<{ degreeId: string }> }
export type WithDegreeId<T = undefined> = T & { degreeId: string };
