import { MainSettings } from '@/features/dashboard/main-settings';
import { SlotSettings } from '@/features/dashboard/slot-settings';

export type ViewMode = 'month' | 'week' | 'day' | 'agenda';
export interface ViewModeToggleRecord { id: ViewMode, label: string, isDisabled: boolean }

export interface AdmissionSearchParams {
  mode: ViewMode
  start: string // yyyy-MM-dd
  end: string // yyyy-MM-dd
}

export interface CalendarSettingsContextType {
  mainSettings: MainSettings | null
  slotSettings: SlotSettings | null
  isLoading: boolean
  error: string | null
  refetch: () => Promise<void>
}

export interface CalendarEvent {
  id: string
  title: string
  start: Date
  end: Date
}

export interface ConvertedEvent {
  id: string
  title: string
  start: Date
  end: Date
}
