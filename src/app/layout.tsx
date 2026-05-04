import type { Metadata } from 'next';
import { Caveat, Geist, Geist_Mono } from 'next/font/google';

import { QueryProvider } from '@/components/providers/query-provider';
import { SessionProvider } from '@/components/providers/session-provider';
import { ThemeProvider } from '@/components/providers/theme-provider';

import '@radix-ui/themes/styles.css';
import './globals.css';

const geist = Geist({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-sans',
});
const geistMono = Geist_Mono({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-mono',
});
const caveat = Caveat({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-handwriting',
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
    <html lang="en" className={`${geist.variable} ${geistMono.variable} ${caveat.variable} bg-background`}>
      <body className="font-sans antialiased">
        <SessionProvider>
          <ThemeProvider>
            <QueryProvider>
              {children}
            </QueryProvider>
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
