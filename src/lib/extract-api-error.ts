// Извлекает статус и сообщение из ошибки API
export function extractApiError(error: unknown) {
  // 1. Проверяем кастомные объекты со статусом (включая ApiError)
  if (error && typeof error === 'object' && 'status' in error) {
    const status = (error).status;
    const message = 'message' in error ? (error as { message: unknown }).message : undefined;

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
