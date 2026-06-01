'use client';

import { useEffect, useState } from 'react';
import { LoaderCircle, LucideIcon } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface StatCardProps {
  title: string
  icon: LucideIcon
  color: string
  description: string
  degreeId?: string
  date?: string
}

export default function StatCard({ title, icon: Icon, color, description, degreeId, date }: StatCardProps) {
  const [isLoading, setLoading] = useState(true);
  const [value, setValue] = useState(0);

  useEffect(() => {
    const fetchStat = async () => {
      try {
        const params = new URLSearchParams();

        if (degreeId) {
          params.set('degreeId', degreeId);
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
  }, [degreeId, date]);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          {title}
        </CardTitle>
        <Icon className={`size-4 ${color}`} />
      </CardHeader>
      <CardContent>
        {isLoading
          ? (<LoaderCircle className="size-5 animate-spin" />)
          : (<div className="text-2xl font-bold">{value}</div>)}
        <p className="text-muted-foreground text-xs">
          {description}
        </p>
      </CardContent>
    </Card>
  );
}
