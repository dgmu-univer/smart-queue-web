export interface MainSettings {
  work_date: WorkDateObject
  work_time: WorkTimeObject
  lunch: LunchObject
}

export interface WorkDateObject {
  start_date: string // Формат: YYYY-MM-DD
  end_date: string // Формат: YYYY-MM-DD
}

export interface WorkTimeObject {
  start_time: string // Формат: HH:MM
  end_time: string // Формат: HH:MM
}

export interface LunchObject {
  start_time: string | undefined // Формат: HH:MM или null
  end_time: string | undefined // Формат: HH:MM или null
}

export interface SlotSettings {
  duration_minutes: number // Формат: HH:MM или null
  capacity_per_slot: number // Формат: HH:MM или null
}

export interface ExcludeSlotItem {
  id: number | null
  date: string
  start_time: string
  end_time: string
}
