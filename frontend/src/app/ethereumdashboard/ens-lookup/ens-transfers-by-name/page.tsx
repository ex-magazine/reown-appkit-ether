import ENSTransferByNameForm from '@/components/ether/ethereumdashboard/ENSTransferByNameForm';
import type { Metadata } from 'next';

// Custom Metadata for SEO
export const metadata: Metadata = {
  title: 'Ethereum ENS Transfers By Name',
  description: 'Lookup and analyze ENS transfers by name',
};

// ENS Transfers By Name Custom Component
export default function ENSTransfersByNamePage() {
  // Render the ENS Transfers By Name Component
  return (
    <div className="min-h-screen bg-gray-800 px-4 py-10 text-gray-300 shadow-lg sm:px-6 lg:px-8">
      <h1 className="mb-6 text-center text-5xl font-bold">
        <span className="bg-gradient-to-r from-gray-400 to-gray-100 bg-clip-text text-transparent">
          ENS Transfers By Name
        </span>
      </h1>
      <p className="mb-12 text-center text-xl text-gray-400">
        Detailed transfers by ENS name
      </p>
      <ENSTransferByNameForm />
    </div>
  );
}
