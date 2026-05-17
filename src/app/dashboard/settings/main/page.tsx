import { Suspense } from 'react';

import MainSettingsForm, { type MainSettings } from '@/features/dashboard/main-settings';
import { apiServer } from '@/lib/api.server';

async function getMainSettingInitData(): Promise<MainSettings> {
  return await apiServer('/admin-settings/periods',
    { method: 'GET', next: { tags: ['main-settings-init'] } });
}

export default async function Page() {
  const data = await getMainSettingInitData();

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <MainSettingsForm initialData={data} />
    </Suspense>
  );
}
