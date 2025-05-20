import ERC721LookupsForm from '@/components/ether/ethereumdashboard/ERC721LookupsForm';
import type { Metadata } from 'next';

// Custom Metadata for SEO
export const metadata: Metadata = {
  title: 'Ethereum ERC721 Lookups',
  description: 'Lookup Ethereum ERC721 tokens and analyze their key features',
};

// ERC721 Lookups Page Custom Component
export default function ERC721LookupsPage() {
  // Render the ERC721 Token Lookups Page Component
  return (
    <div className="min-h-screen bg-gray-800 px-4 py-10 text-gray-300 shadow-lg sm:px-6 lg:px-8">
      <div className="container mx-auto w-full max-w-3xl px-4">
        <h1 className="mb-6 text-center text-5xl font-bold">
          <span className="bg-gradient-to-r from-gray-400 to-gray-100 bg-clip-text text-transparent">
            ERC721 Token Lookup
          </span>
        </h1>
        <p className="mb-12 text-center text-xl text-gray-400">
          Analyze a token from a collection
        </p>
      </div>
      <ERC721LookupsForm />
    </div>
  );
}
