import { redirect } from 'next/navigation';

export default async function Page({ params }: { params: Promise<{ degreeId: string }> }) {
  const { degreeId } = await params;
  redirect(`/dashboard/degree/${degreeId}/main`);
}
