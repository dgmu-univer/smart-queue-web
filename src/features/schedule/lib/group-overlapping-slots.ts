import { FetchScheduleSlot } from '../api/types';

export interface SlotGroup {
  slots: FetchScheduleSlot[]
  pins: string[]
}

export function groupOverlappingSlots(
  slots: FetchScheduleSlot[],
): SlotGroup[] {
  const sorted = [...slots].sort(
    (a, b) =>
      new Date(a.start).getTime()
        - new Date(b.start).getTime(),
  );

  const groups: SlotGroup[] = [];

  for (const slot of sorted) {
    const start = new Date(slot.start).getTime();

    const lastGroup = groups.at(-1);

    if (!lastGroup) {
      groups.push({
        slots: [slot],
        pins: [...slot.pins],
      });

      continue;
    }

    const maxEnd = Math.max(
      ...lastGroup.slots.map(s =>
        new Date(s.end).getTime(),
      ),
    );

    if (start < maxEnd) {
      lastGroup.slots.push(slot);
      lastGroup.pins.push(...slot.pins);
    } else {
      groups.push({
        slots: [slot],
        pins: [...slot.pins],
      });
    }
  }

  return groups;
}
