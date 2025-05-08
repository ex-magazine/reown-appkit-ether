import AddressToENSForm from '@/app/ethereumdashboard/components/AddressToENSForm';
import type { Metadata } from 'next';

// Custom Metadata for SEO
export const metadata: Metadata = {
  title: 'Ethereum Address To ENS Lookup',
  description:
    'Lookup and analyze an Ethereum address by retrieving its ENS domains',
};

// Address To ENS Lookup Custom Component
export default function AddressToENSLookupPage() {
  // Render the Address To ENS Page Component
  return (
    <div className="min-h-screen bg-gray-800 px-4 py-10 text-gray-300 shadow-lg sm:px-6 lg:px-8">
      <h1 className="mb-6 text-center text-5xl font-bold">
        <span className="bg-gradient-to-r from-gray-400 to-gray-100 bg-clip-text text-transparent">
          Address To ENS Conversion
        </span>
      </h1>
      <p className="mb-12 text-center text-xl text-gray-400">
        Detailed ENS information by looking up a wallet address
      </p>
      <AddressToENSForm />
    </div>
  );
}
