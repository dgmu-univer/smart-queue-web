import { DegreeIdParams } from '@/features/dashboard/api.types';
import DegreeMainSettingForm, { fetchSlotSettings } from '@/features/dashboard/degree-slot-settings';

export default async function Page({ params }: DegreeIdParams) {
  const { degreeId } = await params;
  const slotSettings = await fetchSlotSettings(degreeId);

  return <DegreeMainSettingForm initialData={slotSettings} degreeId={degreeId} />;
}
