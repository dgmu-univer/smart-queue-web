'use client';

import { usePathname, useRouter } from 'next/navigation';

import {
  Tabs,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { WithLevelId } from '@/features/admin/education-levels/api.types';

const tabs = [
  {
    value: 'main',
    label: 'Основное',
    href: (levelId: string) => `/admin/education-level/${levelId}/main`,
  },
  {
    value: 'slot',
    label: 'Настройка слота',
    href: (levelId: string) => `/admin/education-level/${levelId}/slot`,
  },
  {
    value: 'weekend',
    label: 'Нерабочие дни',
    href: (levelId: string) => `/admin/education-level/${levelId}/weekend`,
  },
  {
    value: 'excluded',
    label: 'Исключенные слоты',
    href: (levelId: string) => `/admin/education-level/${levelId}/excluded`,
  },
];

type ComponentProps = WithLevelId<unknown>;

export function SettingsTabs({ levelId }: ComponentProps) {
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
          router.push(tab.href(levelId));
        }
      }}
    >
      <TabsList className="border-border h-auto w-full justify-start gap-1 rounded-none border-b bg-transparent p-0">
        {tabs.map(tab => (
          <TabsTrigger
            className="
              text-muted-foreground data-[state=active]:border-foreground data-[state=active]:text-foreground rounded-none border-b-2 border-transparent px-4 pt-1 pb-3 text-sm font-medium shadow-none
              data-[state=active]:bg-transparent data-[state=active]:shadow-none
            "
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
