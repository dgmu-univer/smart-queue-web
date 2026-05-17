'use client';

import { usePathname, useRouter } from 'next/navigation';

import {
  Tabs,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';

const tabs = [
  {
    value: 'main',
    label: 'Основное',
    href: '/dashboard/settings/main',
  },
  {
    value: 'slots',
    label: 'Настройка слота',
    href: '/dashboard/settings/slots',
  },
  {
    value: 'weekend',
    label: 'Нерабочие дни',
    href: '/dashboard/settings/weekend',
  },
  {
    value: 'excluded',
    label: 'Исключенные слоты',
    href: '/dashboard/settings/excluded',
  },
];

export function SettingsTabs() {
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
          router.push(tab.href);
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
