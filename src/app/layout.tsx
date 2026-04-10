import type { Metadata } from "next";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { Inter } from "next/font/google";

import { QueryProvider } from "@/components/providers/query-provider";
import { Toaster } from "@/components/ui/old/toaster";

import "./globals.css";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Price05 — B2B маркетплейс",
  description: "B2B маркетплейс для поставщиков и магазинов",
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
          <Toaster />
        </QueryProvider>
      </body>
    </html>
  );
}
