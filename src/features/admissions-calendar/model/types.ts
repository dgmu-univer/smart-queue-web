export type ViewMode = 'month' | 'week' | 'day' | 'agenda';
export interface ViewModeToggleRecord { id: ViewMode, label: string, isDisabled: boolean }

export interface AdmissionSearchParams {
  mode: ViewMode
  start: string // yyyy-MM-dd
  end: string // yyyy-MM-dd
}
