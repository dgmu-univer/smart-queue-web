import { DegreeIdParams } from '@/features/dashboard/api.types';
import DegreeMainSettingForm, { fetchMainSettings } from '@/features/dashboard/degree-main-setting';

export default async function Page({ params }: DegreeIdParams) {
  const { degreeId } = await params;
  const mainSettings = await fetchMainSettings(degreeId);

  return <DegreeMainSettingForm initialData={mainSettings} degreeId={degreeId} />;
}
