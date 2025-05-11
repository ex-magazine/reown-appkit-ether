import DashboardLayout from '@/components/bitgive/dashboard-layout';
import CharityDetail from '@/components/bitgive/charity-detail';

export default async function CharityDetailPage({
  params,
}: {
  params: { id: number };
}) {
  const charityId = (await params).id;
  return (
    <DashboardLayout>
      <CharityDetail charityId={charityId} />
    </DashboardLayout>
  );
}
