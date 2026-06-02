import { useCallback, useEffect, useState } from 'react';

const MAX_FONT_SIZE = 40;
const MIN_FONT_SIZE = 16;

export const useFontZoom = () => {
  const [fontSize, setFontSize] = useState(() => {
    try {
      const saved = localStorage.getItem('table-font-size');
      return saved ? Number(saved) : MIN_FONT_SIZE; // 16px лучше для ТВ
    } catch {
      console.warn('localStorage не доступен');
      return 16;
    }
  });

  const increaseFont = useCallback((): void => {
    setFontSize((prev) => {
      const newSize = Math.min(prev + 2, MAX_FONT_SIZE); // Больше для ТВ
      try {
        localStorage.setItem('table-font-size', newSize.toString());
      } catch {
        console.warn('Не удалось сохранить');
      }
      return newSize;
    });
  }, []);

  const decreaseFont = useCallback((): void => {
    setFontSize((prev) => {
      const newSize = Math.max(prev - 2, MIN_FONT_SIZE); // Больше для ТВ
      try {
        localStorage.setItem('table-font-size', newSize.toString());
      } catch {
        console.warn('Не удалось сохранить');
      }
      return newSize;
    });
  }, []);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Кнопки "+" и "-" на пульте
      if (e.key === '+' || e.key === '=') {
        increaseFont();
      } else if (e.key === '-' || e.key === '_') {
        decreaseFont();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [decreaseFont, increaseFont]);

  return { fontSize, increaseFont, decreaseFont };
};
