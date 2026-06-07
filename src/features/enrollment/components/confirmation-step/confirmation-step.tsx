/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable @stylistic/multiline-ternary */
'use client';

import { useEffect, useRef, useState } from 'react';
import { format, parseISO } from 'date-fns';
import { ru } from 'date-fns/locale';
import { Download } from 'lucide-react';

import { Button } from '@/components/ui/button';

import { VerifyOtpResponse } from '../../api/types';

interface ConfirmationStepProps {
  onReset: () => void
  meta: VerifyOtpResponse
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

    // Включаем поддержку Retina-дисплеев
    const dpr = 2;
    canvas.width = 400 * dpr;
    canvas.height = 560 * dpr; // Увеличил высоту для напоминания
    ctx.scale(dpr, dpr);

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    // Белый фон
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, 400, 560);

    // Основная карточка
    ctx.strokeStyle = '#e5e5e5';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.roundRect(0, 0, 400, 560, 0);
    ctx.stroke();
    ctx.clip();

    // Шапка билета
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, 400, 140);

    ctx.fillStyle = '#171717';
    ctx.font = 'bold 18px sans-serif';
    ctx.fillText('🔥 Запись успешно создана', 20, 56);

    ctx.fillStyle = '#a3a3a3';
    ctx.font = '12px sans-serif';
    ctx.fillText(`Заявка №${data.id.toString()}`, 20, 80);
    ctx.fillText(`Создано: ${createdDate}`, 20, 100);

    // Разделительная линия 1
    ctx.strokeStyle = '#f5f5f5';
    ctx.beginPath();
    ctx.moveTo(0, 125);
    ctx.lineTo(400, 125);
    ctx.stroke();

    // Тело билета
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 126, 400, 140);

    ctx.fillStyle = '#737373';
    ctx.font = '600 11px sans-serif';
    ctx.fillText('УРОВЕНЬ ОБРАЗОВАНИЯ', 20, 155);

    ctx.fillStyle = '#171717';
    ctx.font = 'bold 15px sans-serif';
    ctx.fillText(data.degree.name, 20, 178);

    const desc = data.degree.description ?? '';
    ctx.fillStyle = '#525252';
    ctx.font = '13px sans-serif';
    if (desc.length > 42) {
      ctx.fillText(desc.slice(0, 42) + '...', 20, 205);
    } else {
      ctx.fillText(desc, 20, 205);
    }

    // Разделительная линия 2
    ctx.strokeStyle = '#f5f5f5';
    ctx.beginPath();
    ctx.moveTo(0, 235);
    ctx.lineTo(400, 235);
    ctx.stroke();

    // Блок даты и времени
    ctx.fillStyle = '#fafafa';
    ctx.fillRect(0, 236, 400, 100);

    ctx.fillStyle = '#737373';
    ctx.font = '600 11px sans-serif';
    ctx.fillText('ДАТА И ВРЕМЯ ПРИЕМА', 20, 268);

    ctx.fillStyle = '#262626';
    ctx.font = '500 15px sans-serif';
    ctx.fillText(appointmentDate, 20, 292);

    // Черный блок с PIN-кодом
    ctx.fillStyle = '#0a0a0a';
    ctx.fillRect(0, 336, 400, 224); // Увеличил высоту черного блока

    ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
    ctx.font = '600 11px sans-serif';
    ctx.fillText('КОД ПОДТВЕРЖДЕНИЯ', 20, 375);

    ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
    ctx.font = '12px sans-serif';
    ctx.fillText('Предъявите при посещении', 20, 398);

    // Плашка PIN-кода
    ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
    ctx.beginPath();
    ctx.roundRect(260, 362, 100, 45, 6);
    ctx.fill();

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 20px monospace';
    ctx.textAlign = 'center';
    ctx.fillText(data.pin, 310, 392);

    // Разделительная линия перед напоминанием
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
    ctx.beginPath();
    ctx.moveTo(20, 430);
    ctx.lineTo(380, 430);
    ctx.stroke();

    // Напоминание в черном блоке
    ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
    ctx.font = 'bold 11px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('⚠️ ВАЖНО: СОХРАНИТЕ БИЛЕТ', 200, 465);

    ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
    ctx.font = '10px sans-serif';
    ctx.fillText('Сделайте скриншот или нажмите "Скачать билет"', 200, 490);
    ctx.fillText('Вы не сможете вернуться на эту страницу после закрытия', 200, 510);

    // Декоративная линия внизу
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.beginPath();
    ctx.moveTo(20, 535);
    ctx.lineTo(380, 535);
    ctx.stroke();

    setImageSrc(canvas.toDataURL('image/png'));
  }, [data, createdDate, appointmentDate]);

  return (
    <div className="w-full">
      <canvas ref={canvasRef} className="hidden" />

      {/* Карточка без отступов */}
      <div className="flex justify-center">
        {imageSrc ? (
          <img
            src={imageSrc}
            alt="Билет подтверждения"
            className="h-auto w-full select-none"
            onContextMenu={(e) => { e.preventDefault(); }}
            draggable={false}
          />
        ) : (
          <div className="flex h-[560px] w-full animate-pulse items-center justify-center bg-neutral-100 text-sm text-neutral-400">
            Формирование билета...
          </div>
        )}
      </div>

      {/* Кнопки управления */}
      <div className="mt-4 space-y-3 px-2">
        {imageSrc && (
          <Button
            type="button"
            variant="outline"
            className="h-12 w-full border-2 border-blue-200 bg-blue-50 font-medium text-blue-700 transition-all hover:bg-blue-100 hover:text-blue-800 hover:shadow-md"
            onClick={() => {
              const link = document.createElement('a');
              link.download = `ticket-${data.id.toString()}.png`;
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
          className="flex h-12 w-full items-center justify-center gap-2 bg-neutral-900 font-medium text-white transition-all hover:bg-neutral-700 hover:shadow-md"
        >
          Записаться еще раз
        </Button>
      </div>
    </div>
  );
}
