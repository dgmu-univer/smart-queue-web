export const dynamic = 'force-dynamic';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div>
      <div>
        {children}
        {' '}
        Дашбоард
      </div>
    </div>
  );
}
