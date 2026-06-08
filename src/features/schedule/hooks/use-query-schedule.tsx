import { useQuery } from '@tanstack/react-query';

import { FetchScheduleResponse, FetchScheduleSlot } from '../api/types';
import { toScheduleRange } from '../lib/to-schedule-range';
import { useSchedule } from '../provider/schedule-provider';

interface UseQuerySchedule<TData> {
  selectCallback: (data: FetchScheduleSlot[]) => TData
  initialData?: FetchScheduleResponse
}

interface UseQueryScheduleResult<TData> {
  data: TData
  dataUpdatedAt: number
}

export const useQuerySchedule = <TData = unknown,>({ selectCallback, initialData }: UseQuerySchedule<TData>): UseQueryScheduleResult<TData> => {
  const { date } = useSchedule();
  const params = toScheduleRange(date);

  const { data, dataUpdatedAt } = useQuery<FetchScheduleResponse, Error, TData>({
    queryKey: ['slots', params],
    queryFn: ({ signal }) => fetch(`/api/appointments?to=${params.to}&from=${params.from}`, {
      headers: {
        'Content-Type': 'application/json',
      },
      signal,
    }).then(res => res.json()),
    initialData,
    staleTime: 0,
    select: data => selectCallback(data.slots),
    refetchInterval: 60000, // 1 минута
    refetchOnWindowFocus: true,
  });

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setUpdatedAt(dataUpdatedAt);
  //   }, 300);

  //   return () => {
  //     clearTimeout(timer);
  //   };
  // }, [dataUpdatedAt, setUpdatedAt]);

  return { data: data as TData, dataUpdatedAt };
};
