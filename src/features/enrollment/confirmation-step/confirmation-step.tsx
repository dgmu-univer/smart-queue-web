/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable @stylistic/multiline-ternary */
'use client';

import { useEffect, useRef, useState } from 'react';
import { format, parseISO } from 'date-fns';
import { ru } from 'date-fns/locale';
import { Download, RotateCcw } from 'lucide-react';

import { Button } from '@/components/ui/button';

import { AppointmentVerifyResponse } from '../api/types';

interface ConfirmationStepProps {
  onReset: () => void
  meta: AppointmentVerifyResponse
}

export default function ConfirmationStep({ onReset, meta }: ConfirmationStepProps) {
  const data = meta;
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Парсинг дат
  const formatDate = (str: string) => {
    try {
      return format(parseISO(str), 'd MMMM yyyy \'в\' HH:mm', { locale: ru });
    } catch {
      return 'Данные отсутствуют';
    }
  };

  const createdDate = formatDate(data.requestedAt);
  const appointmentDate = formatDate(data.slot.startTimeAt);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Включаем поддержку Retina-дисплеев (высокое разрешение картинки)
    const dpr = 2;
    canvas.width = 400 * dpr;
    canvas.height = 480 * dpr;
    ctx.scale(dpr, dpr);

    // 1. Сглаживание
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    // 2. Фон холста
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, 400, 480);

    // 3. Рисуем карточку (основной бордер)
    ctx.strokeStyle = '#e5e5e5';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.roundRect(16, 16, 368, 448, 12);
    ctx.stroke();
    ctx.clip(); // Ограничиваем рисование рамками карточки

    // 4. Шапка билета (Светлый фон)
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(16, 16, 368, 140);

    ctx.fillStyle = '#171717';
    ctx.font = 'bold 18px sans-serif';
    ctx.fillText('Запись успешно создана', 36, 56);

    ctx.fillStyle = '#a3a3a3';
    ctx.font = '12px sans-serif';
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    ctx.fillText(`Заявка №${data.id}`, 36, 80);
    ctx.fillText(`Создано: ${createdDate}`, 36, 100);

    // Разделительная линия 1
    ctx.strokeStyle = '#f5f5f5';
    ctx.beginPath();
    ctx.moveTo(16, 125);
    ctx.lineTo(384, 125);
    ctx.stroke();

    // 5. Тело билета: Данные обучения
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(16, 126, 368, 140);

    ctx.fillStyle = '#737373';
    ctx.font = '600 11px sans-serif';
    ctx.fillText('УРОВЕНЬ ОБРАЗОВАНИЯ', 36, 155);

    ctx.fillStyle = '#171717';
    ctx.font = 'bold 15px sans-serif';
    ctx.fillText(data.slot.degreeProgram.name, 36, 178);

    // Описание программы (перенос строк)
    ctx.fillStyle = '#525252';
    ctx.font = '13px sans-serif';
    const desc = data.slot.degreeProgram.description ?? 'Без описания';
    if (desc.length > 42) {
      ctx.fillText(desc.slice(0, 42) + '...', 36, 205);
    } else {
      ctx.fillText(desc, 36, 205);
    }

    // Разделительная линия 2
    ctx.strokeStyle = '#f5f5f5';
    ctx.beginPath();
    ctx.moveTo(16, 235);
    ctx.lineTo(384, 235);
    ctx.stroke();

    // 6. Блок: Дата и время приема (Светло-серый фон подложки)
    ctx.fillStyle = '#fafafa';
    ctx.fillRect(16, 236, 368, 100);

    ctx.fillStyle = '#737373';
    ctx.font = '600 11px sans-serif';
    ctx.fillText('ДАТА И ВРЕМЯ ПРИЕМА', 36, 268);

    ctx.fillStyle = '#262626';
    ctx.font = '500 15px sans-serif';
    ctx.fillText(appointmentDate, 36, 292);

    // 7. Футер билета: Пин-код (Темная область)
    ctx.fillStyle = '#0a0a0a';
    ctx.fillRect(16, 336, 368, 128);

    ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
    ctx.font = '600 11px sans-serif';
    ctx.fillText('КОД ПОДТВЕРЖДЕНИЯ', 36, 375);

    ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
    ctx.font = '12px sans-serif';
    ctx.fillText('Предъявите при посещении', 36, 398);

    // Отрисовка плашки PIN-кода
    ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
    ctx.beginPath();
    ctx.roundRect(260, 362, 100, 45, 6);
    ctx.fill();

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 20px monospace';
    ctx.textAlign = 'center';
    ctx.fillText(data.pin, 310, 392);

    // Экспорт в dataURL для тега <img />
    setImageSrc(canvas.toDataURL('image/png'));
  }, [data, createdDate, appointmentDate]);

  return (
    <div className="animate-in fade-in-50 mx-auto w-full max-w-md space-y-6 p-2 duration-300">
      {/* Верхний статус успеха */}
      {/* <div className="flex flex-col items-center space-y-2 text-center">
        <div className="flex size-12 items-center justify-center rounded-full border border-emerald-100 bg-emerald-50 text-emerald-600">
          <CheckCircle2 className="size-6" />
        </div>
        <h2 className="text-xl font-semibold tracking-tight text-neutral-900">
          Вы успешно записаны!
        </h2>
        <p className="text-xs text-neutral-400">
          Билет сформирован автоматически защищенным образом.
        </p>
      </div> */}

      {/* Скрытый холст, где генерируется картинка */}
      <canvas ref={canvasRef} className="hidden" />

      {/* Отображение билета в виде защищенной картинки */}
      <div className="flex justify-center rounded-xl border border-neutral-100 bg-neutral-50/50 p-1 shadow-inner">
        { /* // eslint-disable-next-line @stylistic/multiline-ternary */ }
        {imageSrc ? (
          <img
            src={imageSrc}
            alt="Билет подтверждения"
            className="pointer-events-none h-auto w-full max-w-[400px] rounded-xl select-none"
            onContextMenu={(e) => { e.preventDefault(); }} // Защита от контекстного меню (сохранения ссылки/копирования)
          />
        ) : (
          <div className="flex h-[480px] w-full max-w-[400px] animate-pulse items-center justify-center rounded-xl bg-neutral-100 text-sm text-neutral-400">
            Формирование билета...
          </div>
        )}
      </div>

      {/* Кнопки управления */}
      <div className="flex flex-col gap-2 pt-2">
        {imageSrc && (
          <Button
            type="button"
            variant="outline"
            className="h-11 w-full border-neutral-200 text-neutral-700 shadow-sm hover:bg-neutral-50"
            onClick={() => {
              const link = document.createElement('a');
              // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
              link.download = `ticket-${data.id}.png`;
              link.href = imageSrc;
              link.click();
            }}
          >
            <Download className="mr-2 size-4" />
            Скачать билет (PNG)
          </Button>
        )}

        <Button
          type="button"
          onClick={onReset}
          className="flex h-11 w-full items-center justify-center gap-2 bg-neutral-950 text-white transition-all hover:bg-neutral-800"
        >
          <RotateCcw className="size-4" />
          Записаться еще раз
        </Button>
      </div>
    </div>
  );
}
