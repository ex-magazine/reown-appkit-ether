import ERC721CollectionsAnalyticsForm from '@/app/ethereumdashboard/components/ERC721CollectionsAnalyticsForm';
import type { Metadata } from 'next';

// Custom Metadata for SEO
export const metadata: Metadata = {
  title: 'Ethereum ERC721 Collection Analytics',
  description: 'Lookup and analyze an Ethereum ERC721 collection',
};

// ERC721 Collection Analytics Page
export default function ERC721CollectionAnalyticsPage() {
  // Render the ERC721 Collection Analytics Page
  return (
    <div className="min-h-screen bg-gray-800 px-4 py-10 text-gray-300 shadow-lg sm:px-6 lg:px-8">
      <h1 className="mb-6 text-center text-5xl font-bold">
        <span className="bg-gradient-to-r from-gray-400 to-gray-100 bg-clip-text text-transparent">
          ERC721 Collection Analytics
        </span>
      </h1>
      <p className="mb-12 text-center text-xl text-gray-400">
        Dive deep into collection metrics
      </p>
      <ERC721CollectionsAnalyticsForm />
    </div>
  );
}
