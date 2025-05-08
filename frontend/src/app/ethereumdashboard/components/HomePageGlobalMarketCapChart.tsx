'use client';

import useSWR from 'swr';
import GenericFetcher from '../utils/functions/GenericFetcher';
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
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '../components/ui/card';

// Home Page Market Data Section Component
export default function HomePageGlobalMarketCapChart() {
  const {
    data: marketChartData,
    error: marketChartError,
    isLoading: marketChartLoading,
  } = useSWR('/api/ethereumdashboard/global-market-cap-chart-data', GenericFetcher, {
    refreshInterval: 50000,
  });

  // Conditionally render data
  if (marketChartError) {
    return <div>Error Loading Market Cap Chart Data...</div>;
  } else if (marketChartLoading) {
    return <div>Loading Market Cap Chart Data...</div>;
  } else {
    // Retrieve key information
    const chartData = marketChartData.capValues;

    // Adjusting the y-axis for display
    const chart = marketChartData.capValues.map(
      (item: { price: string }) => item.price
    );
    const min = Math.min(...chart);
    const max = Math.max(...chart);
    const buffer = (max - min) * 0.1; // 10% buffer

    // Render data based on market information
    return (
      <Card className="mt-10 w-full border-gray-700 bg-gray-800">
        <CardHeader>
          <CardTitle className="text-xl text-gray-100">
            Global Market Cap (Last 30 Days)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={chartData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                <XAxis
                  dataKey="date"
                  stroke="#888"
                  tick={{ fill: '#888' }}
                  tickFormatter={(value) => value.slice(5, 10)}
                />
                <YAxis
                  stroke="#888"
                  dataKey="price"
                  tick={{ fill: '#888' }}
                  domain={[Math.max(0, min - buffer), max + buffer]}
                  tickFormatter={(value) => `$${(value / 1e12).toFixed(2)}B`}
                />
                <Tooltip
                  contentStyle={{ backgroundColor: '#333', border: 'none' }}
                  labelStyle={{ color: '#888' }}
                  itemStyle={{ color: '#fff' }}
                  formatter={(value: number) => [
                    `$${(value / 1e12).toFixed(2)}B`,
                    'Price',
                  ]}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="price"
                  stroke="#ff4136"
                  strokeWidth={2}
                  dot={true}
                  name="Global Market Cap Data"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    );
  }
}
