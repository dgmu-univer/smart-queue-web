import { ExcludedSlotSettings, PeriodSetting, SlotSettings } from '../../api.types';

export interface EducationLevel {
  id: number
  name: string
  pin: string
  description?: string
  settings: {
    periods: PeriodSetting
    slots: SlotSettings
    excludedSlots: ExcludedSlotSettings[]
    nonWorkingDays: string[]
  }
}

export type EducationLevelResponse = EducationLevel[];

export type CreateEducationLevelPayload = Omit<EducationLevel, 'id'>;
