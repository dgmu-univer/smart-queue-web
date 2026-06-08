import { useEffect, useReducer, useRef } from 'react';
import { Control, UseFormResetField, useWatch } from 'react-hook-form';

import { fetchFreeSlot } from '@/features/enrollment/api/fetch-free-slot';
import { dateAsApiString } from '@/lib/date';
import { extractApiError } from '@/lib/extract-api-error';

import { reducer } from '../reducer';
import { BookingFormValues } from '../schema';

const initialState = {
  slots: [],
  isSlotLoading: true,
  isSlotDisabled: false,
  slotError: null,
};

export function useFreeSlots(control: Control<BookingFormValues>, resetField: UseFormResetField<BookingFormValues>) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const degreeId = useWatch({ control, name: 'degreeId' });
  const selectedDateWatch = useWatch({ control, name: 'date' });
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  const selectedDate = selectedDateWatch ? dateAsApiString(selectedDateWatch) : undefined;

  const abortControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    let isActive = true;

    // Отмена предыдущего запроса
    abortControllerRef.current?.abort();

    if (!degreeId || typeof selectedDate === 'undefined') {
      dispatch({ type: 'RESET' });
      resetField('slot');
      return;
    }

    // Создание нового AbortController
    const abortController = new AbortController();
    abortControllerRef.current = abortController;

    const loadSlots = async () => {
      dispatch({ type: 'LOADING' });
      resetField('slot');

      try {
        const freeSlots = await fetchFreeSlot(
          {
            date: selectedDate,
            degreeId,
          },
          {
            signal: abortController.signal,
          },
        );

        if (isActive && !abortController.signal.aborted) {
          if (freeSlots.slots.length === 0) {
            dispatch({ type: 'EMPTY' });
          } else {
            dispatch({
              type: 'SUCCESS',
              payload: freeSlots.slots,
            });
          }
        }
      } catch (error) {
        if (
          isActive && !abortController.signal.aborted
          && error instanceof Error
        ) {
          const { message } = extractApiError(error);
          dispatch({
            type: 'ERROR',
            payload: {
              variant: 'destructive',
              title: 'Ошибка загрузки слотов',
              description: message,
            },
          });
        }
      }
    };

    void loadSlots();

    return () => {
      isActive = false;
      abortController.abort();
    };
  }, [degreeId, selectedDate, resetField]);

  return state;
}
