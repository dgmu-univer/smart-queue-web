import { FetchScheduleSlot } from '../api/types';
import { groupOverlappingSlots, SlotGroup } from './group-overlapping-slots';

export interface BoardData {
  previous: SlotGroup | null
  current: SlotGroup | null
  next: SlotGroup | null
}

export function buildBoardData(
  slots: FetchScheduleSlot[],
): BoardData {
  const groups = groupOverlappingSlots(slots);

  const now = Date.now();

  const currentIndex = groups.findIndex((group) => {
    const start = Math.min(
      ...group.slots.map(s =>
        new Date(s.start).getTime(),
      ),
    );

    const end = Math.max(
      ...group.slots.map(s =>
        new Date(s.end).getTime(),
      ),
    );

    return now >= start && now < end;
  });

  return {
    previous:
      currentIndex > 0
        ? groups[currentIndex - 1]
        : null,

    current:
      currentIndex >= 0
        ? groups[currentIndex]
        : null,

    next:
      currentIndex >= 0
      && currentIndex < groups.length - 1
        ? groups[currentIndex + 1]
        : null,
  };
}
