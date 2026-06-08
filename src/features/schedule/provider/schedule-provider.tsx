'use client';

import {
  createContext,
  type PropsWithChildren,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import { addDays, subDays } from 'date-fns';

import { useFontZoom } from '../hooks/use-font-zoom';

export interface ScheduleContextValue {
  readonly date: Date
  readonly fontSize: number
  readonly next: () => void
  readonly prev: () => void
  readonly today: () => void
  readonly decreaseFont: () => void
  readonly increaseFont: () => void
  readonly setDate: (date: Date) => void
}

const ScheduleContext = createContext<ScheduleContextValue | null>(null);

export const ScheduleProvider = ({
  children,
}: PropsWithChildren) => {
  const [date, setDate] = useState<Date>(new Date());

  const { fontSize, increaseFont, decreaseFont } = useFontZoom();

  const next = useCallback((): void => {
    setDate(current => addDays(current, 1));
  }, []);

  const prev = useCallback((): void => {
    setDate(current => subDays(current, 1));
  }, []);

  const today = useCallback((): void => {
    setDate(new Date());
  }, []);

  const value = useMemo<ScheduleContextValue>(
    () => ({
      date,
      next,
      prev,
      today,
      setDate,
      fontSize,
      increaseFont,
      decreaseFont,
    }),
    [
      date,
      decreaseFont,
      fontSize,
      increaseFont,
      next,
      prev,
      today,
    ],
  );

  return (
    <ScheduleContext.Provider value={value}>
      {children}
    </ScheduleContext.Provider>
  );
};

export const useSchedule = (): ScheduleContextValue => {
  const context = useContext(ScheduleContext);

  if (context === null) {
    throw new Error(
      'useSchedule must be used within ScheduleProvider',
    );
  }

  return context;
};
