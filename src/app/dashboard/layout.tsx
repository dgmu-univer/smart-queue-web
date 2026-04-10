import { DashboardWrapper } from "@/components/dashboard/dashboard-wrapper";
import { DashboardProvider } from "@/components/providers/dashboard-provider";

export const dynamic = "force-dynamic";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DashboardProvider>
      <DashboardWrapper>{children}</DashboardWrapper>
    </DashboardProvider>
  );
}
