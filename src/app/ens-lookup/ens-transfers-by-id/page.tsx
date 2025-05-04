import ENSTransfersByIDForm from '@/components/ethereumdashboard/ENSTransferByIDForm';
import type { Metadata } from 'next';

// Custom Metadata for SEO
export const metadata: Metadata = {
  title: 'Ethereum ENS Transfers By ID',
  description: 'Lookup and analyze ENS transfers by ID',
};

// ENS Transfers By ID Custom Component
export default function ENSTransfersByIDPage() {
  // Render the ENS Transfers By ID Component
  return (
    <div className="bg-gray-800 px-4 py-10 text-gray-300 shadow-lg sm:px-6 lg:px-8">
      <h1 className="mb-6 text-center text-5xl font-bold">
        <span className="bg-gradient-to-r from-gray-400 to-gray-100 bg-clip-text text-transparent">
          ENS Transfers By ID
        </span>
      </h1>
      <p className="mb-12 text-center text-xl text-gray-400">
        Detailed ENS transfers by token ID
      </p>
      <ENSTransfersByIDForm />
    </div>
  );
}
