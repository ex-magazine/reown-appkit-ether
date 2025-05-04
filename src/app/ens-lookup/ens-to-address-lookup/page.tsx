import ENSToAddressForm from '@/components/ethereumdashboard/ENSToAddressForm';
import type { Metadata } from 'next';

// Custom Metadata for SEO
export const metadata: Metadata = {
  title: 'Ethereum ENS To Address Lookup',
  description:
    'Lookup and analyze an ENS domain by retrieving its Ethereum address',
};

// ENS To Address Lookup Page Custom Component
export default function ENSToAddressLookupPage() {
  // Render the ENS To Address Page Component
  return (
    <div className="min-h-screen bg-gray-800 px-4 py-10 text-gray-300 shadow-lg sm:px-6 lg:px-8">
      <h1 className="mb-6 text-center text-5xl font-bold">
        <span className="bg-gradient-to-r from-gray-400 to-gray-100 bg-clip-text text-transparent">
          ENS To Address Conversion
        </span>
      </h1>
      <p className="mb-12 text-center text-xl text-gray-400">
        Detailed wallet information by looking up an ENS domain
      </p>
      <ENSToAddressForm />
    </div>
  );
}
