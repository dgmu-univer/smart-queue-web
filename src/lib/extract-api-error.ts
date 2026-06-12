import { formatDuration, intervalToDuration } from 'date-fns';
import { ru } from 'date-fns/locale';

export function extractApiError(error: unknown) {
  // 1. Проверяем кастомные объекты со статусом (включая ApiError)
  if (error && typeof error === 'object' && 'status' in error) {
    const status = (error).status;
    const message = 'message' in error ? (error as { message: unknown }).message : undefined;

    // Обработка 429 Rate Limit
    if (typeof status === 'number' && status === 429) {
      let retryAfter: unknown;

      if ('headers' in error && typeof (error as { headers: unknown }).headers === 'object') {
        const headers = (error as { headers: Record<string, unknown> }).headers;
        retryAfter = headers['x-ratelimit-retry-after'];
      }

      const retrySeconds = typeof retryAfter === 'number'
        ? retryAfter
        : typeof retryAfter === 'string'
          ? parseInt(retryAfter, 10)
          : undefined;

      const retryMs = retrySeconds && !isNaN(retrySeconds) ? retrySeconds * 1000 : undefined;

      // Форматируем длительность через date-fns
      let durationText: string;
      if (retrySeconds && !isNaN(retrySeconds)) {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const duration = intervalToDuration({ start: 0, end: retryMs! });
        durationText = formatDuration(duration, {
          locale: ru,
          format: ['minutes', 'seconds'],
          zero: false,
        });
      } else {
        durationText = '';
      }

      return {
        status: 429,
        message: retrySeconds && !isNaN(retrySeconds)
          ? `Превышен лимит запросов. Повторите через ${durationText}.`
          : 'Превышен лимит запросов. Повторите позже.',
        retryAfter: retryMs,
      };
    }

    return {
      status: typeof status === 'number' ? status : 500,
      message: typeof message === 'string' ? message : JSON.stringify(error),
    };
  }

  // 2. Стандартный класс Error
  if (error instanceof Error) {
    return {
      status: 500,
      message: error.message,
    };
  }

  // 3. Если пришла строка
  if (typeof error === 'string') {
    return { status: 500, message: error };
  }

  // 4. Если примитив (number, boolean) — их приведение к строке безопасно
  if (typeof error === 'number' || typeof error === 'boolean') {
    return { status: 500, message: error.toString() };
  }

  // 5. Если пришел объект или массив без статуса
  if (error && typeof error === 'object') {
    try {
      return { status: 500, message: JSON.stringify(error) };
    } catch {
      return { status: 500, message: 'Ошибка содержит циклические ссылки' };
    }
  }

  // 6. Для null и undefined
  return {
    status: 500,
    message: 'Неизвестная ошибка сервера',
  };
}
