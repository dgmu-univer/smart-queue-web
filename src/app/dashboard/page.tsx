import { Card } from '@radix-ui/themes';
import {
  BookOpen,
  Calendar,
  GraduationCap,
  Stethoscope,
  Users } from 'lucide-react';

import DashboardPage from '@/components/dashboard/dashboard-page';
import { CardContent, CardHeader, CardTitle } from '@/components/ui/card';

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

export default function Page() {
  return (
    <DashboardPage title="Статистика">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {stats.map(item => (
          <Card key={item.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {item.title}
              </CardTitle>
              <item.icon className={`size-4 ${item.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{item.value}</div>
              <p className="text-muted-foreground text-xs">
                {item.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </DashboardPage>
  );
}
