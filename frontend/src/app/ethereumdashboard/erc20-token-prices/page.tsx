import type { Metadata } from 'next';
import ERC20TokenPricesForm from '../components/ERC20TokenPricesForm';

// Custom Metadata for SEO
export const metadata: Metadata = {
  title: 'Ethereum ERC20 Token Prices',
  description: 'Analyze an ERC20 token based on recent market data',
};

// ERC20 Token Prices Page Custom Component
export default function ERC20TokenPricesPage() {
  // Render the ERC20 Token Prices Page Component
  return (
    <div className="min-h-screen bg-gray-800 px-4 py-10 text-gray-300 shadow-lg sm:px-6 lg:px-8">
      <h1 className="mb-6 text-center text-5xl font-bold">
        <span className="bg-gradient-to-r from-gray-400 to-gray-100 bg-clip-text text-transparent">
          ERC20 Prices
        </span>
      </h1>
      <p className="mb-12 text-center text-xl text-gray-400">
        Dive deep into token market metrics
      </p>
      <ERC20TokenPricesForm />
    </div>
  );
}
