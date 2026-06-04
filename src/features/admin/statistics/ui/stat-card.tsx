'use client';

import { useEffect, useState } from 'react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface StatCardProps {
  label: string
  description: string
  levelId?: number
  date?: string
}

export const formatMetricValue = (value: number | string): string => {
  // Преобразуем строку в число, если пришла строка
  const num = typeof value === 'string' ? parseFloat(value.replace(/,/g, '')) : value;

  if (isNaN(num)) return String(value);

  return new Intl.NumberFormat('en-US').format(num);
};

export default function StatCard({ label, description, levelId, date }: StatCardProps) {
  const [isLoading, setLoading] = useState(true);
  const [value, setValue] = useState(0);

  useEffect(() => {
    const fetchStat = async () => {
      try {
        const params = new URLSearchParams();

        if (levelId) {
          params.set('degreeId', levelId.toString());
        }

        if (date) {
          params.set('date', date);
        }

        const res = await fetch(
          `/api/statistics${params.size ? `?${params.toString()}` : ''}`,
        );

        if (!res.ok) {
          throw new Error(`Request failed: ${res.status.toString()}`);
        }

        const data = await res.json() as { success: boolean, value: number };

        if (data.success) {
          setValue(data.value);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    void fetchStat();
  }, [levelId, date]);

  return (
    <Card className="gap-0 shadow-sm">
      <CardHeader className="pb-0">
        <CardTitle className="text-muted-foreground text-[11px] font-bold tracking-wider uppercase">
          {label}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col">
        {isLoading
          ? (<div className="h-7 w-24 animate-pulse rounded-sm bg-zinc-200 dark:bg-zinc-800" />)
          : (
              <span className="text-2xl font-bold tracking-tight">
                {formatMetricValue(value)}
              </span>
            )}
        <p className="text-muted-foreground text-xs">{description}</p>
      </CardContent>
    </Card>
  );
}
