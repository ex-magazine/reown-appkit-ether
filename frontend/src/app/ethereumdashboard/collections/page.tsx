import type { Metadata } from 'next';
import CollectionsSelectorSection from '@/components/ether/ethereumdashboard/CollectionsSelectorSection';

// Custom Metadata for SEO
export const metadata: Metadata = {
  title: 'Ethereum Collections Analytics',
  description: 'Lookup and analyze Ethereum collections',
};

// Collections Page Custom Component
export default function CollectionsPage() {
  // Render the Token Analytics Collections Page
  return (
    <div className="min-h-screen bg-gray-800 px-4 py-10 text-gray-300 shadow-lg sm:px-6 lg:px-8">
      <h1 className="mb-6 text-center text-5xl font-bold">
        <span className="bg-gradient-to-r from-gray-400 to-gray-100 bg-clip-text text-transparent">
          Token Analytics
        </span>
      </h1>
      <p className="mb-12 text-center text-xl text-gray-400">
        Dive deep into token collections and evaluate metrics
      </p>
      <CollectionsSelectorSection />
    </div>
  );
}
