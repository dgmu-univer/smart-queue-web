import { Suspense } from 'react';

import MainSettingsForm, { getMainSettingInitData } from '@/features/dashboard/main-settings';

export default async function Page() {
  const data = await getMainSettingInitData();

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <MainSettingsForm initialData={data} />
    </Suspense>
  );
}
