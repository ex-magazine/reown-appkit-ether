import WalletAnalyticsForm from '@/components/ethereumdashboard/WalletAnalyticsForm';
import type { Metadata } from 'next';

// Custom Metadata for SEO
export const metadata: Metadata = {
  title: 'Ethereum Wallet Analytics',
  description: 'Analyze Ethereum wallets and evaluate performance',
};

// Wallet Analytics Custom Component
export default function WalletAnalyticsPage() {
  // Render the Wallet Analytics Page Component
  return (
    <div className="min-h-screen bg-gray-800 px-4 py-10 text-gray-300 shadow-lg sm:px-6 lg:px-8">
      <h1 className="mb-6 text-center text-5xl font-bold">
        <span className="bg-gradient-to-r from-gray-400 to-gray-100 bg-clip-text text-transparent">
          Wallet Analytics
        </span>
      </h1>
      <p className="mb-12 text-center text-xl text-gray-400">
        Dive deep into wallet performance
      </p>
      <WalletAnalyticsForm />
    </div>
  );
}
