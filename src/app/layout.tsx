import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import { QueryProvider } from '@/components/providers/query-provider';
import { SessionProvider } from '@/components/providers/session-provider';
import { ThemeProvider } from '@/components/providers/theme-provider';

import '@radix-ui/themes/styles.css';
import './globals.css';

const inter = Inter({ subsets: ['cyrillic', 'cyrillic-ext'], variable: '--font-inter' });


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
      <body className={`${inter.variable} font-sans antialiased`}>
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
