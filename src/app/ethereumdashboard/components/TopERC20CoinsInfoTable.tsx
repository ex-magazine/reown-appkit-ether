'use client';

import useSWR from 'swr';
import Image from 'next/image';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../components/ui/table';
import GenericFetcher from '../utils/functions/GenericFetcher';
import TopERC20CoinsType from '../utils/types/TopERC20CoinsType';

// Top ERC20 Coins Table Custom Component
export default function TopERC20CoinsInfoTable() {
  const {
    data: coins,
    error: coinsError,
    isLoading: loadingCoins,
  } = useSWR<TopERC20CoinsType[]>('/api/ethereumdashboard/top-erc20-tokens', GenericFetcher, {
    refreshInterval: 50000,
  });

  // Conditionally render this component
  if (coinsError) {
    return (
      <div className="p-4 text-red-500">
        Error Loading Top ERC20 Coins Data...
      </div>
    );
  } else if (loadingCoins) {
    return (
      <div className="p-4 text-gray-300">Loading Top ERC20 Coins Data...</div>
    );
  } else {
    // Render component using the information provided
    return (
      <div className="mt-10 bg-gray-900 p-4 shadow-lg">
        <h4 className="mb-4 text-2xl font-bold text-gray-100">Top Coins</h4>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-gray-300">Name</TableHead>
              <TableHead className="text-gray-300">Symbol</TableHead>
              <TableHead className="text-gray-300">Price</TableHead>
              <TableHead className="text-gray-300">Price Change</TableHead>
              <TableHead className="text-gray-300">Market Cap</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {coins?.map((coin, index: number) => (
              <TableRow key={index} className="border-b border-gray-800">
                <TableCell className="font-medium text-gray-100">
                  {coin.token_name}
                </TableCell>
                <TableCell className="text-gray-300">
                  <div className="flex items-center space-x-2">
                    <Image
                      alt={`${coin.token_logo} logo`}
                      height={20}
                      width={20}
                      src={coin.token_logo}
                    />
                    <span>{String(coin.token_symbol).toUpperCase()}</span>
                  </div>
                </TableCell>
                <TableCell className="text-gray-300">
                  {Number(coin.price_usd) < 0.01
                    ? '<$0.01'
                    : '$' + Number(coin.price_usd).toFixed(2)}
                </TableCell>
                <TableCell
                  className={
                    Number(coin.price_24h_percent_change) >= 0
                      ? 'text-green-500'
                      : 'text-red-500'
                  }
                >
                  {Number(coin.price_24h_percent_change) > 0
                    ? '+' + Number(coin.price_24h_percent_change).toFixed(2)
                    : Number(coin.price_24h_percent_change).toFixed(2)}
                  %
                </TableCell>
                <TableCell className="text-gray-300">
                  {'$' + coin.market_cap_usd}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }
}
