import RocketPoolStatsInfoTable from '@/components/ether/ethereumdashboard/RocketPoolStatsInfoTable';
import StakingWebsiteSection from '@/components/ether/ethereumdashboard/StakingWebsitesSection';
import ValidatorLeaderboardInfoTable from '@/components/ether/ethereumdashboard/ValidatorLeaderboardInfoTable';
import ValidatorQueueInfoTable from '@/components/ether/ethereumdashboard/ValidatorQueueInfoTable';
import type { Metadata } from 'next';

// Custom Metadata for SEO
export const metadata: Metadata = {
  title: 'Ethereum Staking and Validators',
  description: 'Lookup and analyze Ethereum validators and staking metrics',
};

// Staking Page Custom Page Component
export default function StakingPage() {
  // Render the Staking Page
  return (
    <div className="min-h-screen bg-gray-800 px-4 py-10 text-gray-300 shadow-lg sm:px-6 lg:px-8">
      <h5 className="mb-6 text-center text-5xl font-bold">
        <span className="bg-gradient-to-r from-gray-400 to-gray-100 bg-clip-text text-transparent">
          Ethereum Staking & Validators
        </span>
      </h5>
      <p className="mb-12 mb-5 text-center text-xl text-gray-400">
        <i>Learn about staking and validators within the Ethereum ecosystem.</i>
      </p>
      <RocketPoolStatsInfoTable />
      <ValidatorLeaderboardInfoTable />
      <ValidatorQueueInfoTable />
      <hr className="mb-10 mt-10" />
      <StakingWebsiteSection />
    </div>
  );
}
