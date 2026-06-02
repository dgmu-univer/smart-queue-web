import { FetchScheduleSlot } from '../api/types';

export const groupedSlots = (slots: FetchScheduleSlot[]) => Object.entries(
  slots.reduce<Record<string, FetchScheduleSlot[]>>((acc, slot) => {
    const date = slot.start.slice(0, 10);

    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (!acc[date]) {
      acc[date] = [];
    }

    acc[date].push(slot);

    return acc;
  }, {}),
);
