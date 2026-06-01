'use client';

import { format } from 'date-fns';
import { Calendar } from 'lucide-react';

import { API_DATE_FORMAT } from '@/lib/date';

import StatCard from './stat-card';

interface Degree {
  id: number
  name: string
  description: string
}

interface StatisticsProps {
  degrees?: Degree[]
}

export default function Statistics({ degrees }: StatisticsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
      <StatCard
        title="За сегодня"
        date={format(new Date(), API_DATE_FORMAT)}
        degreeId="1"
        description="новых абитуриентов"
        color="text-blue-600"
        icon={Calendar}
      />
      <StatCard
        title="За все время"
        description="всего заявок"
        color="text-blue-600"
        icon={Calendar}
      />
    </div>
  );
}
