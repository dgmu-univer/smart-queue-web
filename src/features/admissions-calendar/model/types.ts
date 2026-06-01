import { PeriodSetting } from '@/features/dashboard/api.types';
import { SlotSettings } from '@/features/dashboard/degree-slot-settings/lib/schema';

export type ViewMode = 'month' | 'week' | 'day' | 'agenda';
export interface ViewModeToggleRecord { id: ViewMode, label: string, isDisabled: boolean }

export interface AdmissionSearchParams {
  mode: ViewMode
  start: string // yyyy-MM-dd
  end: string // yyyy-MM-dd
}

export interface CalendarSettingsContextType {
  mainSettings: PeriodSetting | null
  slotSettings: SlotSettings | null
  isLoading: boolean
  error: string | null
  refetch: () => Promise<void>
}

export interface CalendarEvent {
  id: number
  title: string
  start: string // yyyy-MM-dd
  end: string // yyyy-MM-dd
}

export interface ConvertedEvent {
  id: number
  title: string
  start: Date
  end: Date
}

export interface GroupedCalendarEvent {
  id: string
  start: Date
  end: Date
  pins: string[]
  total: number
}
