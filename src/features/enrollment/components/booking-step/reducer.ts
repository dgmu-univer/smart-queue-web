interface SlotState {
  slots: string[]
  isSlotLoading: boolean
  isSlotDisabled: boolean
  slotError: AlertError | null
}

export interface AlertError {
  variant: 'destructive' | undefined
  title: string
  description?: string
}

type Action
  = | { type: 'RESET' }
    | { type: 'LOADING' }
    | { type: 'SUCCESS', payload: string[] }
    | { type: 'EMPTY' }
    | { type: 'ERROR', payload: AlertError };

const initialState: SlotState = {
  slots: [],
  isSlotLoading: false,
  isSlotDisabled: true,
  slotError: null,
};

export function reducer(state: SlotState, action: Action): SlotState {
  switch (action.type) {
    case 'RESET':
      return {
        ...initialState,
      };

    case 'LOADING':
      return {
        ...state,
        isSlotLoading: true,
        isSlotDisabled: true,
        slotError: null,
      };

    case 'SUCCESS':
      return {
        slots: action.payload,
        isSlotLoading: false,
        isSlotDisabled: false,
        slotError: null,
      };

    case 'EMPTY':
      return {
        slots: [],
        isSlotLoading: false,
        isSlotDisabled: true,
        slotError: {
          variant: undefined,
          title: 'Нет свободных слотов',
          description: 'К сожалению, на выбранную дату все слоты заняты. Рекомендуем выбрать другую дату в календаре.',
        },
      };

    case 'ERROR':
      return {
        slots: [],
        isSlotLoading: false,
        isSlotDisabled: true,
        slotError: action.payload,
      };

    default:
      return state;
  }
}
