'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

// Network Selector Custom Component
export default function NetworkSelector(props: {
  networkSelector: (network: string) => void;
}) {
  const { networkSelector } = props;

  // Render the Network Selector Component
  return (
    <div className="mx-auto mt-8 w-full max-w-md text-center">
      <label className="mb-4 block pt-2">
        <p className="pt-2 text-xl text-gray-400">Network Selector</p>
      </label>
      <Select onValueChange={networkSelector} defaultValue="eth">
        <SelectTrigger className="w-full rounded-md border-gray-700 bg-gray-900 text-gray-100 hover:bg-gray-800 focus:ring-gray-400">
          <SelectValue placeholder="Select Network" />
        </SelectTrigger>
        <SelectContent className="border-gray-700 bg-gray-900 text-gray-100">
          <SelectItem value="eth">Ethereum Mainnet</SelectItem>
          <SelectItem value="sepolia">Sepolia Testnet</SelectItem>
          <SelectItem value="holesky">Holesky Testnet</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
