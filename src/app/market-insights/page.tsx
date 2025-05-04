import MarketInsightsSection from '@/components/ethereumdashboard/MarketInsightsSection';
import type { Metadata } from 'next';

// Custom Metadata for SEO
export const metadata: Metadata = {
  title: 'Market Insights',
  description: 'Get a quick glance at the latest market conditions',
};

// Render the Market Insights Page containing the Market Insights Section Custom Component
export default function MarketInsightsPage() {
  return (
    <div className="min-h-screen bg-gray-800 px-4 py-10 text-gray-300 shadow-lg sm:px-6 lg:px-8">
      <h1 className="mb-6 text-center text-5xl font-bold">
        <span className="bg-gradient-to-r from-gray-400 to-gray-100 bg-clip-text text-transparent">
          Market Insights
        </span>
      </h1>
      <p className="mb-12 text-center text-xl text-gray-400">
        <i>Catch a quick read on market conditions</i>
      </p>
      <MarketInsightsSection />
    </div>
  );
}
