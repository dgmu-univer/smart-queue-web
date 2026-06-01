import { DegreeIdParams } from '@/features/dashboard/api.types';
import ExcludedSlotsTable, { fetchExcludedSlots } from '@/features/dashboard/degree-excluded-slot-setting';

export default async function Page({ params }: DegreeIdParams) {
  const { degreeId } = await params;
  const slotSettings = await fetchExcludedSlots(degreeId);

  return <ExcludedSlotsTable initialData={slotSettings} degreeId={degreeId} />;
}
