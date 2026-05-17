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
  start_time?: string // Формат: HH:MM или null
  end_time?: string // Формат: HH:MM или null
}
