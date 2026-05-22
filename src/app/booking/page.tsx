import BookingCalendar from '@/features/booking-calendar';

export default async function Workspace({ searchParams }: { searchParams: Promise<{ start: string, end: string }> }) {
  const params = await searchParams;
  console.log(params);
  return (
    <div className="size-svh min-h-full min-w-full">
      <BookingCalendar />
    </div>
  );
}
