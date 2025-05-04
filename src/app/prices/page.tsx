import CryptoPricesTable from '@/components/ethereumdashboard/CryptoPricesTable';
import TopWinningCoinsTable from '@/components/ethereumdashboard/TopWinningCoinsTable';
import TopLosingCoinsTable from '@/components/ethereumdashboard/TopLosingCoinsTable';
import type { Metadata } from 'next';

// Custom Metadata for SEO
export const metadata: Metadata = {
  title: 'Cryptocurrency Prices',
  description:
    'Analyze the top winning and losing cryptocurrencies in the market',
};

// Cryptocurrency Prices Page
export default function CryptoCurrencyPricesPage() {
  // Render the Cryptocurrency Prices Page
  // Include the Top Winning and Top Losing Coins Table Components
  return (
    <div className="bg-gray-800 px-4 py-10 text-gray-300 shadow-lg sm:px-6 lg:px-8">
      <h1 className="mb-6 text-center text-5xl font-bold">
        <span className="bg-gradient-to-r from-gray-400 to-gray-100 bg-clip-text text-transparent">
          Cryptocurrency Prices
        </span>
      </h1>
      <p className="mb-12 text-center text-xl text-gray-400">
        Dive deep into market prices
      </p>
      <hr className="mt-5" />
      <TopWinningCoinsTable />
      <TopLosingCoinsTable />
      <CryptoPricesTable />
    </div>
  );
}
