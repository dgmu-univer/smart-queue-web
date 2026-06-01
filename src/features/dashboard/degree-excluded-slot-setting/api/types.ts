import { ExcludedSlotSettings } from '../../api.types';

export type FetchExcludedSlotsResponse = ExcludedSlotSettings[];
export type CreateExcludedSlotPayload = Omit<ExcludedSlotSettings, 'id'>;
