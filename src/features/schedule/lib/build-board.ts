import { parseISO, compareAsc } from 'date-fns';

// ==================== ТИПЫ ====================

interface Slot {
  start: string
  end: string
  pins: string[]
}

interface SlotGroup {
  start: number
  end: number
  timeRanges: string[]
  pins: string[]
}

export interface BoardData {
  previous: SlotGroup
  current: SlotGroup
  next: SlotGroup
}

// ==================== УТИЛИТЫ ====================

function parseMoscowTime(isoString: string): Date {
  if (!isoString) return new Date(0);

  const withTz = isoString.includes('+') || isoString.endsWith('Z')
    ? isoString
    : `${isoString}+03:00`;
  const fullDate = parseISO(withTz);

  const timeOnly = new Date(0);
  timeOnly.setHours(fullDate.getHours(), fullDate.getMinutes(), 0, 0);
  return timeOnly;
}

function formatTimeRange(start: Date, end: Date): string {
  const pad = (n: number) => n.toString().padStart(2, '0');
  return `${pad(start.getHours())}:${pad(start.getMinutes())}-${pad(end.getHours())}:${pad(end.getMinutes())}`;
}

function getNowTime(): Date {
  const localNow = new Date();
  const now = new Date(0);
  now.setHours(localNow.getHours(), localNow.getMinutes(), 0, 0);
  return now;
}

// ==================== ОБЪЕДИНЕНИЕ ТОЛЬКО РЕАЛЬНЫХ ПЕРЕСЕЧЕНИЙ ====================

/**
 * Объединяем только если есть РЕАЛЬНОЕ пересечение (start < other.end && other.start < end).
 * Слоты, идущие подряд (end === next.start) — НЕ объединяем.
 */
function mergeOverlappingSlots(slots: Slot[] = []): { start: Date, end: Date, slots: Slot[] }[] {
  if (typeof slots === 'undefined' || slots.length === 0) return [];

  const parsed = slots.map(s => ({
    start: parseMoscowTime(s.start),
    end: parseMoscowTime(s.end),
    slot: s,
  }));

  parsed.sort((a, b) => compareAsc(a.start, b.end));

  const merged: typeof parsed[] = [];
  let current = [parsed[0]];

  for (let i = 1; i < parsed.length; i++) {
    const last = current[current.length - 1];
    const next = parsed[i];

    // РЕАЛЬНОЕ пересечение: start < other.end И other.start < end
    // (не просто касание границ)
    if (last.start < next.end && next.start < last.end) {
      if (next.end > last.end) last.end = next.end;
      current.push(next);
    } else {
      merged.push(current);
      current = [next];
    }
  }
  merged.push(current);

  return merged.map(group => ({
    start: group[0].start,
    end: group.reduce((max, item) => item.end > max ? item.end : max, group[0].start),
    slots: group.map(g => g.slot),
  }));
}

// ==================== ПУСТОЙ СЛОТ ====================

function emptySlotGroup(): SlotGroup {
  return {
    start: 0,
    end: 0,
    timeRanges: [],
    pins: [],
  };
}

// ==================== ГЛАВНАЯ ФУНКЦИЯ ====================

export function buildBoardData(slots: Slot[] = [], nowTime?: Date): BoardData {
  const now = nowTime ?? getNowTime();
  const nowMs = now.getTime();

  const groups = mergeOverlappingSlots(slots);

  const slotGroups: SlotGroup[] = groups.map((g) => {
    const allPins = Array.from(new Set(g.slots.flatMap(s => s.pins)));
    return {
      start: g.start.getTime(),
      end: g.end.getTime(),
      timeRanges: g.slots.map(s => formatTimeRange(parseMoscowTime(s.start), parseMoscowTime(s.end))),
      pins: allPins,
    };
  });

  if (slotGroups.length === 0) {
    return { previous: emptySlotGroup(), current: emptySlotGroup(), next: emptySlotGroup() };
  }

  // Находим current
  let currentIndex = -1;
  for (let i = 0; i < slotGroups.length; i++) {
    if (nowMs >= slotGroups[i].start && nowMs < slotGroups[i].end) {
      currentIndex = i;
      break;
    }
  }

  // now внутри слота
  if (currentIndex !== -1) {
    return {
      previous: currentIndex > 0 ? slotGroups[currentIndex - 1] : emptySlotGroup(),
      current: slotGroups[currentIndex],
      next: currentIndex < slotGroups.length - 1 ? slotGroups[currentIndex + 1] : emptySlotGroup(),
    };
  }

  // now до всех слотов
  if (nowMs < slotGroups[0].start) {
    return {
      previous: emptySlotGroup(),
      current: emptySlotGroup(),
      next: slotGroups[0],
    };
  }

  // now после всех слотов
  if (nowMs >= slotGroups[slotGroups.length - 1].end) {
    return {
      previous: slotGroups[slotGroups.length - 1],
      current: emptySlotGroup(),
      next: emptySlotGroup(),
    };
  }

  // now в промежутке между слотами
  for (let i = 0; i < slotGroups.length - 1; i++) {
    if (nowMs >= slotGroups[i].end && nowMs < slotGroups[i + 1].start) {
      return {
        previous: slotGroups[i],
        current: emptySlotGroup(),
        next: slotGroups[i + 1],
      };
    }
  }

  return { previous: emptySlotGroup(), current: emptySlotGroup(), next: emptySlotGroup() };
}
