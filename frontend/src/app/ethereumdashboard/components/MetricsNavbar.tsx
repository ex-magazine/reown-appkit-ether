'use client';

import GenericFetcher from '@/app/ethereumdashboard/utils/functions/GenericFetcher';
import useSWR from 'swr';
import EthereumGasDataType from '../utils/types/EthereumGasDataType';
import NavbarEthereumDataType from '../utils/types/NavbarEthereumDataType';

// Custom Metrics Navbar Component
// useSWR for efficient data fetching
export default function MetricsNavbar() {
  // Data fetching using the custom fetcher function and useSWR
  const {
    data: ethData,
    error: ethError,
    isLoading: ethLoading,
  } = useSWR<NavbarEthereumDataType>(
    '/api/navbar/ethereum-price',
    GenericFetcher,
    { refreshInterval: 50000 },
  );
  const {
    data: gasData,
    error: gasError,
    isLoading: gasLoading,
  } = useSWR<EthereumGasDataType>(
    '/api/ethereumdashboard/navbar/gas-track',
    GenericFetcher,
    {
      refreshInterval: 50000,
    },
  );

  // Conditionally rendering component
  if (ethError || gasError)
    return <div className="bg-red-500 p-2 text-white">Error fetching data</div>;
  else if (ethLoading || gasLoading)
    return <div className="bg-gray-800 p-2 text-white">Loading...</div>;
  else if (ethData && gasData) {
    const { ethereum } = ethData;

    // Returning the final JSX code for component
    return (
      <nav className="bg-gray-900 px-4 py-2 text-white">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <span className="ping-animation h-2 w-2 rounded-full bg-green-500"></span>
              <span className="text-xs font-semibold text-green-500">Live</span>
            </div>
            <span>
              ETH Price: <span>${Number(ethereum?.usd).toFixed(2)}</span>
            </span>
            <span>
              24-Hr % Chg:
              <span
                className={
                  ethereum?.usd_24h_change >= 0
                    ? 'text-green-500'
                    : 'text-red-500'
                }
              >
                {ethereum?.usd_24h_change > 0 ? ' +' : ' '}
                {ethereum?.usd_24h_change.toFixed(2)}%
              </span>
            </span>
            <span>
              Gas Price:{' '}
              <span className="font-bold">
                {String(gasData?.maxPrice)} Gwei
              </span>
            </span>
          </div>
        </div>
      </nav>
    );
  }
}
