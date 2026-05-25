import { Suspense } from 'react';
import { redirect } from 'next/navigation';
import { format, isMatch } from 'date-fns';

import { AdmissionSearchParams, type ViewMode } from '@/features/admissions-calendar';

function isValidDateFormat(dateString?: string): boolean {
  if (!dateString) return false;
  return isMatch(dateString, 'yyyy-MM-dd');
}
const allowedModes: ViewMode[] = ['day', 'week', 'month', 'agenda'];

export default async function Page({ searchParams }: { searchParams: Promise<Partial<AdmissionSearchParams>> }) {
  const params = await searchParams;
  const mode = params.mode;
  const start = params.start;
  const end = params.end;

  const isValidMode = mode && allowedModes.includes(mode);
  const isValidStart = isValidDateFormat(start);
  const isValidEnd = isValidDateFormat(end);

  if (!isValidMode || !isValidStart || !isValidEnd) {
    const today = format(new Date(), 'yyyy-MM-dd');
    return redirect(`/admissions?mode=day&start=${today}&end=${today}`);
  }

  return (
    <Suspense key={params.mode} fallback={<div>Загружаем</div>}>
      <div className="size-full bg-blue-300">
        Тут будет календарь
      </div>
    </Suspense>

  );
}
