'use client';

import { format } from 'date-fns';

import { API_DATE_FORMAT } from '@/lib/date';

import StatCard from './stat-card';

interface EducationsLevel {
  id: number
  name: string
}

interface StatisticsProps {
  educationsLevels: EducationsLevel[]
}

export default function AdminStats({ educationsLevels }: StatisticsProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <StatCard
        label="За сегодня"
        date={format(new Date(), API_DATE_FORMAT)}
        description="новых заявок"
      />
      <StatCard
        label="За все время"
        description="всего заявок"
      />
      {educationsLevels.map(level => (
        <StatCard
          key={level.id}
          label={level.name}
          levelId={level.id}
          description="за все время"
        />
      )) }
    </div>
  );
}
