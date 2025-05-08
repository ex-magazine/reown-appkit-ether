import Link from 'next/link';
import { Button } from './components/ui/button';
import HomePageWalletForm from './components/HomePageWalletForm';
import HomePageMarketDataSection from './components/HomePageMarketDataSection';
import HomePageGlobalMarketCapChart from './components/HomePageGlobalMarketCapChart';
import HomePageTrendingCoinsTable from './components/HomePageTrendingCoinsTable';
import HomePageTrendingCollectionsTable from './components/HomePageTrendingCollectionsTable';
import type { Metadata } from 'next';

// Custom Metadata
export const metadata: Metadata = {
  title: 'Home Page',
  description: 'Home Page for the Ethereum Dashboard web application',
};

// Home Page Custom Component
export default function HomePage() {
  // Return JSX for the Home Page component
  return (
    <div className="bg-gray-800 px-4 py-10 text-gray-300 shadow-lg sm:px-6 lg:px-8">
      <h1 className="mb-6 text-center text-5xl font-bold">
        <span className="bg-gradient-to-r from-gray-400 to-gray-100 bg-clip-text text-transparent">
          Dashboard
        </span>
      </h1>
      <div className="mx-auto max-w-3xl">
        <p className="mb-8 text-lg">
          Deep dive into wallet information, price action, and much more! Here
          is a link to all <b>EVM-compatible</b> chains and their IDs:{' '}
          <u>
            <Link
              href="https://chainlist.org"
              target="_blank"
              rel="noreferrer"
              className="text-grey hover:text-silver-300 transition-colors"
            >
              <b>ChainList</b>
            </Link>
          </u>
          .
        </p>
        <HomePageWalletForm />
        <div className="mt-8 text-center">
          <label className="mb-2 block pt-3 text-lg">Learn more</label>
          <Button
            className="transform rounded-md bg-gradient-to-r from-gray-600 to-gray-400 px-6 py-2 text-white transition-all duration-300 hover:scale-105 hover:from-gray-500 hover:to-gray-300"
            asChild
          >
            <Link href="/about">About</Link>
          </Button>
        </div>
      </div>
      <hr className="mt-10" />
      <HomePageMarketDataSection />
      <HomePageGlobalMarketCapChart />
      <HomePageTrendingCoinsTable />
      <HomePageTrendingCollectionsTable />
    </div>
  );
}
