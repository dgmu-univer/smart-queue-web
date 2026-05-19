import { PropsWithChildren } from 'react';

type DashboardPageHeaderProps = PropsWithChildren<{
  title: string
  description?: string
}>;

export default function DashboardPage({ title, children, description }: DashboardPageHeaderProps) {
  return (
    <div className="mb-12 flex flex-col gap-10">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold tracking-tight text-balance sm:text-4xl">
          {title}
        </h1>
        { description
          ? (
              <p className="text-muted-foreground text-sm text-pretty sm:text-base">
                {description}
              </p>
            )
          : null }
      </div>
      <div className="flex flex-col gap-6">
        {children}
      </div>
    </div>
  );
}
