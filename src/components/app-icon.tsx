import Image, { type ImageProps } from 'next/image';

export function AppIcon(props: Omit<ImageProps, 'src' | 'alt'>) {
  return (
    <Image
      src="/avatars/logo.png"
      alt="Логотип сайта"
      {...props}
    />
  );
}
