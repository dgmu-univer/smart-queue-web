'use client';

import { usePathname, useRouter } from 'next/navigation';

import {
  Tabs,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { WithDegreeId } from '@/features/dashboard/api.types';

const tabs = [
  {
    value: 'main',
    label: 'Основное',
    href: (degreeId: string) => `/dashboard/degree/${degreeId}/main`,
  },
  {
    value: 'slot',
    label: 'Настройка слота',
    href: (degreeId: string) => `/dashboard/degree/${degreeId}/slot`,
  },
  {
    value: 'weekend',
    label: 'Нерабочие дни',
    href: (degreeId: string) => `/dashboard/degree/${degreeId}/weekend`,
  },
  {
    value: 'excluded',
    label: 'Исключенные слоты',
    href: (degreeId: string) => `/dashboard/degree/${degreeId}/excluded`,
  },
];

export function SettingsTabs({ degreeId }: WithDegreeId) {
  const pathname = usePathname();
  const router = useRouter();

  const currentTab
    = tabs.find(tab => pathname.includes(tab.value))?.value ?? 'main';

  return (
    <Tabs
      value={currentTab}
      onValueChange={(value) => {
        const tab = tabs.find(t => t.value === value);

        if (tab) {
          router.push(tab.href(degreeId));
        }
      }}
    >
      <TabsList>
        {tabs.map(tab => (
          <TabsTrigger
            key={tab.value}
            value={tab.value}
          >
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}
