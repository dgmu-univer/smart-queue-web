import { ExcludedSlotSettings, PeriodSetting, SlotSettings } from '../../api.types';

export interface GetDegreeResponseItem {
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

export type CreateDegreePayload = Omit<GetDegreeResponseItem, 'id'>;
