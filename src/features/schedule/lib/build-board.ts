import { FetchScheduleSlot } from '../api/types';

export interface ScheduleBoardData {
  current: FetchScheduleSlot | undefined
  next: FetchScheduleSlot[]
}

export function buildBoardData(
  slots: FetchScheduleSlot[],
  nextCount = 5,
): ScheduleBoardData {
  const now = Date.now();

  // const current
  //   = slots.find((slot) => {
  //     const start = new Date(slot.start).getTime();
  //     const end = new Date(slot.end).getTime();

  //     return now >= start && now < end;
  //   }) ?? null;

  // const next = slots
  //   .filter(slot => new Date(slot.start).getTime() > now)
  //   .sort(
  //     (a, b) =>
  //       new Date(a.start).getTime()
  //         - new Date(b.start).getTime(),
  //   )
  //   .slice(0, nextCount);
  //
  const current = slots.find(
    slot =>
      now >= new Date(slot.start).getTime()
      && now < new Date(slot.end).getTime(),
  );

  const next = slots
    .filter(slot => new Date(slot.start).getTime() > now)
    .slice(0, nextCount);

  return {
    current,
    next,
  };
}
