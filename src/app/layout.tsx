import type { Metadata } from "next";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { Geist } from "next/font/google";

import { QueryProvider } from "@/components/providers/query-provider";

import "./globals.css";

const inter = Geist({
  subsets: ["latin", "cyrillic"],
  weight: ["500", "600", "800"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "ДГМУ — Запись в приёмную комиссию",
  description: "Никаких очередей. Выберите дату и время визита за 2 минуты.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" suppressHydrationWarning dir="ltr">
      <body className={inter.variable}>
        <QueryProvider>
          <NextThemesProvider>{children}</NextThemesProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
