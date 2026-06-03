'use client';

interface PinProps {
  pin: string
  className?: string // Для передачи внешних классов (размеры, отступы)
  style?: React.CSSProperties // Для передачи кастомных инлайн-стилей снаружи
}

export const Pin = ({ pin }: PinProps) => {
  return (
    <span
      className="inline-bloc mr-2 px-2 py-1 font-mono font-bold whitespace-nowrap"
    >
      {pin}
    </span>
  );
};
