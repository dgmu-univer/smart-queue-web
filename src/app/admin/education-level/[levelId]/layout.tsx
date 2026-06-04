import { PropsWithChildren, Suspense } from 'react';

import TabLoadingFallback from '@/components/admin/loader-fallback';
import { SettingsTabs } from '@/components/admin/settings-tabs';
import { LevelSettingPageParams } from '@/features/admin/education-levels/api.types';

export default async function SettingsLayout({ children, params }: PropsWithChildren & LevelSettingPageParams) {
  const { levelId } = await params;
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-foreground text-2xl font-semibold">
        Настройки —
        {levelId}
      </h1>
      <SettingsTabs levelId={levelId} />
      <Suspense fallback={<TabLoadingFallback />}>
        {children}
      </Suspense>
    </div>
  );
}
