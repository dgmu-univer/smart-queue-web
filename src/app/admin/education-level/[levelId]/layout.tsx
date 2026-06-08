import { PropsWithChildren, Suspense } from 'react';

import { DynamicTitle } from '@/components/admin/dynamic-title';
import TabLoadingFallback from '@/components/admin/loader-fallback';
import { SettingsTabs } from '@/components/admin/settings-tabs';
import { LevelSettingPageParams } from '@/features/admin/education-levels/api.types';

type PageProps = PropsWithChildren
  & LevelSettingPageParams;

export default async function SettingsLayout({ children, params }: PageProps) {
  const { levelId } = await params;
  return (
    <div className="flex flex-col gap-6">
      <DynamicTitle />
      <SettingsTabs levelId={levelId} />
      <Suspense fallback={<TabLoadingFallback />}>
        {children}
      </Suspense>
    </div>
  );
}
