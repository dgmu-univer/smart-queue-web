import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';

import { QueryProvider } from '@/components/providers/query-provider';

import '@radix-ui/themes/styles.css';
import './globals.css';

const inter = Roboto({
  subsets: ['latin', 'cyrillic'],
  weight: ['500', '600', '800'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'ДГМУ — Запись в приёмную комиссию',
  description: 'Никаких очередей. Выберите дату и время визита за 2 минуты.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru" suppressHydrationWarning dir="ltr">
      <body className={inter.variable}>
        <QueryProvider>
          {children}
        </QueryProvider>
      </body>
    </html>
  );
}
