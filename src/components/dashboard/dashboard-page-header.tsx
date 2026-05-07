import { PropsWithChildren } from 'react';

type DashboardPageHeaderProps = PropsWithChildren<{
  title: string
  description?: string
}>;

export default function DashboardPageHeader({ title, children, description }: DashboardPageHeaderProps) {
  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold tracking-tight text-balance sm:text-4xl">
          {title}
        </h1>
        { description
          ? (
              <p className="text-muted-foreground text-sm text-pretty sm:text-base">
                Here&apos;s what&apos;s happening with your creative workspace today.
              </p>
            )
          : null }
      </div>
      {children}
    </div>
  );
}
