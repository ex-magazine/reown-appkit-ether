import DashboardLayout from '@/components/bitgive/dashboard-layout';
import NftGallery from '@/components/bitgive/nft-gallery';

export default function MyNftsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">My NFT Collection</h1>
        <p className="text-muted-foreground">View your donation rewards</p>
        <NftGallery />
      </div>
    </DashboardLayout>
  );
}
