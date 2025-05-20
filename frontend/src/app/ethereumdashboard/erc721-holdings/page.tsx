import ERC721HoldingsForm from '@/components/ether/ethereumdashboard/ERC721HoldingsForm';
import type { Metadata } from 'next';

// Custom Metadata for SEO
export const metadata: Metadata = {
  title: 'Ethereum ERC721 Holdings',
  description: 'Analyze Ethereum wallet ERC721 token holdings',
};

// ERC721 Holdings Custom Component
export default function ERC721HoldingsPage() {
  // Render the ERC721 Holdings Page Component
  return (
    <div className="min-h-screen bg-gray-800 px-4 py-10 text-gray-300 shadow-lg sm:px-6 lg:px-8">
      <h1 className="mb-6 text-center text-5xl font-bold">
        <span className="bg-gradient-to-r from-gray-400 to-gray-100 bg-clip-text text-transparent">
          ERC721 Holdings
        </span>
      </h1>
      <p className="mb-12 text-center text-xl text-gray-400">
        Dive deep into wallet Holdings
      </p>
      <ERC721HoldingsForm />
    </div>
  );
}
