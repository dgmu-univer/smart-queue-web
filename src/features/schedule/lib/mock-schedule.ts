import { FetchScheduleResponse, FetchScheduleSlot } from '../api/types';

interface GenerateMockSlotsParams {
  from: Date | string
  to: Date | string

  durationMinutes?: number
  capacityPerSlot?: number

  workdayStartHour?: number // 9
  workdayEndHour?: number // 18

  skipWeekends?: boolean
}

const sleep = (ms: number) =>
  new Promise(resolve => setTimeout(resolve, ms));

export async function generateMockSlots({
  from,
  to,

  durationMinutes = 15,
  capacityPerSlot = 10,

  workdayStartHour = 9,
  workdayEndHour = 23,

  skipWeekends = true,
}: GenerateMockSlotsParams): Promise<FetchScheduleResponse> {
  await sleep(1000);
  const fromDate = new Date(from);
  const toDate = new Date(to);

  const slots: FetchScheduleSlot[] = [];

  const currentDay = new Date(fromDate);
  currentDay.setHours(0, 0, 0, 0);

  while (currentDay <= toDate) {
    const dayOfWeek = currentDay.getDay();

    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;

    if (!(skipWeekends && isWeekend)) {
      const dayStart = new Date(currentDay);
      dayStart.setHours(workdayStartHour, 0, 0, 0);

      const dayEnd = new Date(currentDay);
      dayEnd.setHours(workdayEndHour, 0, 0, 0);

      const slotStart = new Date(dayStart);

      while (slotStart < dayEnd && slotStart < toDate) {
        const slotEnd = new Date(
          slotStart.getTime() + durationMinutes * 60 * 1000,
        );

        if (slotEnd > dayEnd) {
          break;
        }

        const pinsCount = Math.floor(
          Math.random() * (capacityPerSlot + 1),
        );

        const pins = generatePins(pinsCount);

        slots.push({
          start: slotStart.toISOString(),
          end: slotEnd.toISOString(),
          pins,
        });

        slotStart.setMinutes(
          slotStart.getMinutes() + durationMinutes,
        );
      }
    }

    currentDay.setDate(currentDay.getDate() + 1);
  }

  return {
    slotsSettings: {
      duration_minutes: durationMinutes,
      capacity_per_slot: capacityPerSlot,
    },
    slots,
  };
}

function generatePins(count: number): string[] {
  const pins = new Set<string>();

  while (pins.size < count) {
    pins.add(
      Math.floor(1000 + Math.random() * 9000).toString(),
    );
  }

  return [...pins];
}
