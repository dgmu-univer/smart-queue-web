'use client';

import { useState } from 'react';
import { CheckCircle2, Copy, Loader2, XCircle } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { createAppointmentToken } from '@/lib/appointment-token';

interface GetPinButtonProps {
  recordId: number
}

export default function GetPinButton({ recordId }: GetPinButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [pinCode, setPinCode] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyPin = async () => {
    if (pinCode) {
      try {
        await navigator.clipboard.writeText(pinCode);
        setIsCopied(true);
        setTimeout(() => {
          setIsCopied(false);
        }, 2000);
      } catch (err) {
        // Для HTTPS или localhost fallback не нужен,
        // но можно показать пользователю уведомление об ошибке
        console.error('Не удалось скопировать текст:', err);
        // Опционально: показать toast или уведомление
      }
    }
  };

  const handleGetPin = async () => {
    setIsModalOpen(true);
    setIsLoading(true);
    setPinCode(null);
    setError(null);

    try {
      const token = createAppointmentToken(recordId);
      const response = await fetch('/api/appointment-pin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token,
        }),
      });

      const data = await response.json() as { pin: string };

      if (!response.ok) {
        throw new Error('Ошибка получения PIN-кода');
      }

      setPinCode(data.pin);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Произошла ошибка');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    // Сбрасываем состояние при закрытии
    setTimeout(() => {
      setPinCode(null);
      setError(null);
    }, 300);
  };

  return (
    <>
      <button
        type="button"
        onClick={() => {
          void handleGetPin();
        }}
        className="cursor-pointer border-none bg-transparent p-0 text-sm font-normal text-blue-600 transition-colors duration-200 hover:text-blue-800 hover:underline"
        disabled={isLoading}
      >
        Не пришел СМС
      </button>

      <Dialog open={isModalOpen} onOpenChange={handleCloseModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center">
              Получение PIN-кода
            </DialogTitle>
            <DialogDescription className="text-center">
              {isLoading
                ? 'Пожалуйста, подождите, идет запрос к серверу'
                : 'Ваш PIN-код для входа' }
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-col items-center justify-center">
            {isLoading && (
              <div className="flex flex-col items-center gap-3">
                <Loader2 className="text-primary size-12 animate-spin" />
                <p className="text-muted-foreground text-sm">Идет получение PIN-кода...</p>
              </div>
            )}

            {pinCode && !isLoading && (
              <div className="flex flex-col items-center">
                <div className="text-center">
                  <div className="flex items-center justify-center gap-3">
                    <p className="text-primary text-4xl font-bold tracking-widest">
                      {pinCode}
                    </p>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="size-8 hover:bg-transparent"
                      onClick={() => {
                        void handleCopyPin();
                      }}
                    >
                      {isCopied
                        ? (
                            <CheckCircle2 className="size-4 text-green-500" />
                          )
                        : (
                            <Copy className="text-muted-foreground hover:text-primary size-4 transition-colors" />
                          )}
                    </Button>
                  </div>
                  <div className="mx-auto mt-4 max-w-xs space-y-2">
                    <p className="text-muted-foreground/70 text-xs">
                      СМС-уведомления временно недоступны в связи с техническими работами.
                      Для входа используйте PIN-код.
                      Отправка сообщений возобновится после завершения настройки.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {error && !isLoading && (
              <div className="flex flex-col items-center gap-3">
                <XCircle className="text-destructive size-12" />
                <p className="text-destructive text-center text-sm">{error}</p>
              </div>
            )}
          </div>

          <DialogFooter className="flex flex-col gap-2 sm:flex-row">
            <Button
              variant={error ? 'default' : 'outline'}
              className="w-full"
              onClick={handleCloseModal}
            >
              {error ? 'Закрыть' : 'Готово'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
