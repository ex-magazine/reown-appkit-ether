import GenericGasMetricsInfoTable from '@/components/ethereumdashboard/GenericGasMetricsInfoTable';
import GasBlockInfoTable from '@/components/ethereumdashboard/GasBlockInfoTable';
import type { Metadata } from 'next';

// Custom Metadata for SEO
export const metadata: Metadata = {
  title: 'Ethereum Gas',
  description: 'Analyze Ethereum Gas metrics and block data',
};

// Gas Tracker Page
export default function GasTrackerPage() {
  // Render the Gas Tracker Page
  // Include the Generic Gas Metrics Table and the Gas Block Info Table Components
  return (
    <div className="bg-gray-800 px-4 py-10 text-gray-300 shadow-lg sm:px-6 lg:px-8">
      <h1 className="mb-6 text-center text-5xl font-bold">
        <span className="bg-gradient-to-r from-gray-400 to-gray-100 bg-clip-text text-transparent">
          Gas Tracker
        </span>
      </h1>
      <p className="mb-12 text-center text-xl text-gray-400">
        Dive deep into Ethereum Gas metrics
      </p>
      <hr className="p-3" />
      <GenericGasMetricsInfoTable />
      <GasBlockInfoTable />
    </div>
  );
}
