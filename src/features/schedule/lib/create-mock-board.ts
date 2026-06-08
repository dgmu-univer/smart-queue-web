import { BoardData } from './build-board';
import { SlotGroup } from './group-overlapping-slots';

function generatePins(count: number): string[] {
  return Array.from({ length: count }, (_, index) =>
    String(1000 + index),
  );
}

function createGroup(
  timeRanges: string[],
  pinsCount: number,
): SlotGroup {
  return {
    slots: timeRanges.map((range) => {
      const [start, end] = range.split('-');

      return {
        start,
        end,
      };
    }),
    pins: generatePins(pinsCount),
  };
}

export function createMockBoardData({
  previousPins = random(5, 30),
  currentPins = random(10, 30),
  nextPins = random(2, 30),
}: {
  previousPins?: number
  currentPins?: number
  nextPins?: number
} = {}): BoardData {
  return {
    previous: createGroup(
      [
        '16:45-17:00',
        '16:50-17:05',
      ],
      previousPins,
    ),

    current: createGroup(
      [
        '17:15-17:30',
        '17:20-17:35',
      ],
      currentPins,
    ),

    next: createGroup(
      [
        '17:35-17:50',
        '17:40-17:55',
      ],
      nextPins,
    ),
  };
}

function random(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
