import type { Metadata } from 'next';
import ENSSelectorSection from '../components/ENSSelectorSection';

// Custom Metadata for SEO
export const metadata: Metadata = {
  title: 'ENS Lookup',
  description: 'Lookup and analyze ENS data using different conversion methods',
};

// ENS Lookup Page Custom Component
export default function ENSLookupPage() {
  // Render the ENS Lookup Page
  return (
    <div className="min-h-screen bg-gray-800 px-4 py-10 text-gray-300 shadow-lg sm:px-6 lg:px-8">
      <div className="container mx-auto w-full max-w-3xl px-4">
        <h1 className="mb-6 text-center text-5xl font-bold">
          <span className="bg-gradient-to-r from-gray-400 to-gray-100 bg-clip-text text-transparent">
            ENS Conversions
          </span>
        </h1>
        <p className="mb-12 text-center text-xl text-gray-400">
          Select conversion options from the menu below!
        </p>
        <ENSSelectorSection />
      </div>
    </div>
  );
}
