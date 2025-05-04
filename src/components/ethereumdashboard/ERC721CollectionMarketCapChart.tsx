'use client';

import { useState } from 'react';
import useSWR from 'swr';
import PostFetcher from '@/utils/functions/PostFetcher';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { Card, CardContent, CardDescription, CardHeader } from './ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import ERC721CollectionExtraDataType from '@/utils/types/ERC721CollectionExtraDataType';
import PostFetcherArgumentsType from '@/utils/types/PostFetcherArgumentsType';

// ERC721 Collection Market Cap Chart Custom Component
export default function ERC721CollectionMarketCapChart(props: {
  data: ERC721CollectionExtraDataType;
  address: string;
}) {
  const { address, data } = props;
  const [interval, setInterval] = useState<string>('14');

  // Fetch data for chart display
  const {
    data: erc721CollectionMarketCapData,
    error: erc721CollectionMarketCapError,
    isLoading: erc721CollectionMarketCapLoading,
  } = useSWR(
    ['/api/erc721-collection-chart-data', { address, interval }],
    ([url, body]: [string, PostFetcherArgumentsType]) =>
      PostFetcher(url, { arg: body }),
    { refreshInterval: 100000 }
  );

  // Conditionally render data
  if (erc721CollectionMarketCapError) {
    throw new Error();
  } else if (erc721CollectionMarketCapLoading) {
    return (
      <div>
        <p className="text-white-100">Loading Market Cap Chart Data...</p>
      </div>
    );
  } else {
    // Retrieve key information
    const chartData = erc721CollectionMarketCapData.marketCaps;

    // Modifying the y-axis domain for appropriate ranges
    const prices = erc721CollectionMarketCapData.marketCaps.map(
      (item: { price: string }) => item.price
    );
    const min = Math.min(...prices);
    const max = Math.max(...prices);
    const buffer = (max - min) * 0.1; // 10% buffer

    // Render data based on market information
    return (
      <div className="mt-10 bg-gray-800 px-4 py-10 text-gray-300 shadow-lg sm:px-6 lg:px-8">
        <h4 className="mb-6 text-center text-5xl font-bold">
          <span className="bg-gradient-to-r from-gray-400 to-gray-100 bg-clip-text text-transparent">
            Historical Market Cap Information
          </span>
        </h4>
        <Card className="mt-10 w-full border-gray-700 bg-gray-900">
          <CardHeader>
            <CardDescription className="text-gray-100">
              Contract Address: <b>{' ' + data.contract_address}</b>
            </CardDescription>
            <div className="flex items-center space-x-2">
              <CardDescription className="text-gray-100">
                Market Cap:
              </CardDescription>
              <CardDescription className="text-gray-100">
                <b>{' $' + data.market_cap.usd}</b>
              </CardDescription>
            </div>
            <Select value={interval} onValueChange={setInterval}>
              <SelectTrigger className="w-[180px] bg-gray-700 text-gray-100">
                <SelectValue placeholder="Select Interval" />
              </SelectTrigger>
              <SelectContent className="bg-gray-700 text-gray-100">
                <SelectItem value="14">15 Days</SelectItem>
                <SelectItem value="30">30 Days</SelectItem>
              </SelectContent>
            </Select>
          </CardHeader>
          <CardContent>
            <div className="h-[400px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={chartData}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 80,
                    bottom: 20,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                  <XAxis
                    dataKey="date"
                    stroke="#888"
                    tick={{ fill: '#888' }}
                    padding={{ left: 10, right: 10 }}
                  />
                  <YAxis
                    stroke="#888"
                    dataKey="price"
                    tick={{ fill: '#888' }}
                    domain={[Math.max(0, min - buffer), max + buffer]}
                    padding={{ top: 10, bottom: 10 }}
                    tickFormatter={(value) =>
                      value.toLocaleString('en-US', {
                        style: 'currency',
                        currency: 'USD',
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })
                    }
                  />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#333', border: 'none' }}
                    labelStyle={{ color: '#888' }}
                    itemStyle={{ color: '#fff' }}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="price"
                    stroke="#ff4136"
                    strokeWidth={2}
                    dot={true}
                    name="Market Cap (USD)"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }
}
