export interface PeriodSettingsPayload {
  work_date?: SchedulePeriod
  work_time?: TimeRange
  lunch?: LunchRange
}

export interface GetPeriodSettings {
  work_date: SchedulePeriod
  work_time: TimeRange
  lanch: LunchRange
}

export interface SchedulePeriod {
  start_date: string // Формат: YYYY-MM-DD
  end_date: string // Формат: YYYY-MM-DD
}

export interface TimeRange {
  start_time: string // Формат: HH:MM
  end_time: string // Формат: HH:MM
}

export interface LunchRange {
  start_time: string | undefined // Формат: HH:MM или null
  end_time: string | undefined // Формат: HH:MM или null
}

export interface SlotRange {
  duration_minutes: number // Формат: HH:MM или null
  capacity_per_slot: number // Формат: HH:MM или null
}

export interface ExcludeSlot {
  id: null
  date: string
  start_time: string
  end_time: string
}
