import { Metadata } from 'next';
import {
  BookOpen,
  Calendar,
  GraduationCap,
  Stethoscope,
  Users } from 'lucide-react';

import DashboardPage from '@/components/dashboard/dashboard-page';
import DegreeManager, { fetchAllDegree } from '@/features/dashboard/degree-manager';
import Statistics from '@/features/statistics';

export const metadata: Metadata = {
  title: 'Статистика — Панель управления — ДГМУ',
  description: 'Страница для просмотра статистики',
};

const stats = [
  {
    title: 'За сегодня',
    value: '+42',
    description: 'новых абитуриентов',
    icon: Calendar,
    color: 'text-blue-600',
  },
  {
    title: 'За все время',
    value: '1,284',
    description: 'всего заявок',
    icon: Users,
    color: 'text-slate-600',
  },
  {
    title: 'Колледж',
    value: '450',
    description: 'всего заявок',
    icon: BookOpen,
    color: 'text-emerald-600',
  },
  {
    title: 'Специалитет',
    value: '612',
    description: 'всего заявок',
    icon: GraduationCap,
    color: 'text-indigo-600',
  },
  {
    title: 'Ординатура',
    value: '222',
    description: 'всего заявок',
    icon: Stethoscope,
    color: 'text-rose-600',
  },
];

export default async function Page() {
  const initialDegree = await fetchAllDegree();

  return (
    <DashboardPage title="Статистика">
      <Statistics />
      <DegreeManager initialDegrees={initialDegree} />
    </DashboardPage>
  );
}
