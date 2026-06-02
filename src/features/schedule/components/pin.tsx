'use client';

// Карта цветов для каждого варианта от 0 до 9
const pinStylesMap: Record<number, { bg: string, text: string }> = {
  0: { bg: '#f3f4f6', text: '#1f2937' }, // Серый
  1: { bg: '#dbeafe', text: '#1e40af' }, // Синий
  2: { bg: '#dcfce7', text: '#166534' }, // Зеленый
  3: { bg: '#fef9c3', text: '#854d0e' }, // Желтый
  4: { bg: '#fee2e2', text: '#991b1b' }, // Красный
  5: { bg: '#f3e8ff', text: '#6b21a8' }, // Фиолетовый
  6: { bg: '#fce7f3', text: '#9d174d' }, // Розовый
  7: { bg: '#e0e7ff', text: '#3730a3' }, // Индиго
  8: { bg: '#ecfeff', text: '#155e75' }, // Бирюзовый
  9: { bg: '#ffedd5', text: '#9a3412' }, // Оранжевый
};

const getPinInlineStyle = (pin: string) => {
  const lastCharDigit = parseInt(pin.slice(-1));
  const index = isNaN(lastCharDigit) ? 0 : lastCharDigit % 10;
  return pinStylesMap[index];
};

interface PinProps {
  pin: string
  className?: string // Для передачи внешних классов (размеры, отступы)
  style?: React.CSSProperties // Для передачи кастомных инлайн-стилей снаружи
}

export const Pin = ({ pin }: PinProps) => {
  const inlineColor = getPinInlineStyle(pin);

  return (
    <span
      style={{
        backgroundColor: inlineColor.bg,
        color: inlineColor.text,
      }}
      className="mr-2 inline-block rounded-xs px-2 py-1 align-middle font-mono whitespace-nowrap"
    >
      {pin}
    </span>
  );
};
