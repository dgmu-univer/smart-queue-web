import { AdmissionsCalendar, AdmissionSearchParams, fetchMockEvents } from '@/features/admissions-calendar';

// Отключаем кэширование
export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const fetchCache = 'force-no-store';

// Это серверный компонент (чтобы отрабатывал Suspense)
export async function AdmissionsAsyncCalendar({
  searchParams,
}: {
  searchParams: AdmissionSearchParams
}) {
  // Данные загружаются на сервере при каждом изменении searchParams
  const admissions = await fetchMockEvents({
    start: searchParams.start,
    end: searchParams.end,
  });

  // Передаём уже загруженные данные в клиентский компонент
  return (
    <AdmissionsCalendar
      initialData={admissions}
      mode={searchParams.mode}
      startDate={searchParams.start}
    />
  );
}
