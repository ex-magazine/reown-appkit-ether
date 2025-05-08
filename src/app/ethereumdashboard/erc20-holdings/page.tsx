import ERC20HoldingsForm from '../components/ERC20HoldingsForm';
import type { Metadata } from 'next';

// Custom Metadata for SEO
export const metadata: Metadata = {
  title: 'Ethereum ERC20 Holdings',
  description: 'Analyze an Ethereum wallet and its ERC20 token holdings',
};

// ERC20 Holdings Custom Component
export default function ERC20HoldingsPage() {
  // Render the ERC20 Holdings Page Page Component
  return (
    <div className="min-h-screen bg-gray-800 px-4 py-10 text-gray-300 shadow-lg sm:px-6 lg:px-8">
      <div className="container mx-auto w-full max-w-3xl px-4">
        <h1 className="mb-6 text-center text-5xl font-bold">
          <span className="bg-gradient-to-r from-gray-400 to-gray-100 bg-clip-text text-transparent">
            ERC20 Holdings
          </span>
        </h1>
        <p className="mb-12 text-center text-xl text-gray-400">
          Dive deep into wallet holdings
        </p>
      </div>
      <ERC20HoldingsForm />
    </div>
  );
}
