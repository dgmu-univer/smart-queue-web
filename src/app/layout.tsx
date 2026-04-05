import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import './globals.css'

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-inter',
})
import { QueryProvider } from '@/components/providers/query-provider'
import { Toaster } from '@/components/ui/old/toaster'

export const metadata: Metadata = {
  title: 'Price05 — B2B маркетплейс',
  description: 'B2B маркетплейс для поставщиков и магазинов',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='ru' suppressHydrationWarning>
      <body className={inter.variable}>
        <QueryProvider>
          {children}
          <Toaster />
        </QueryProvider>
      </body>
    </html>
  )
}
