'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import { Button } from '../components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../components/ui/card';

// ENS Selector Section Custom Component
export default function ENSSelectorSection() {
  const router = useRouter();
  const [conversionURL, setConversionURL] = useState<string>(
    'address-to-ens-lookup'
  );

  // Dynamically handle collection URL settings
  const handleConversionChange = (value: string) => {
    setConversionURL(value);
  };

  // Push endpoint value to /ens-lookup path
  const handleViewConversion = () => {
    router.push(`/ens-lookup/${conversionURL}`);
  };

  // Render the ENS Selector Section Component
  return (
    <Card className="w-full border-gray-800 bg-gray-900 shadow-xl">
      <CardHeader className="border-b border-gray-800 pb-6">
        <CardTitle className="text-3xl text-gray-100">
          Select Conversion
        </CardTitle>
        <CardDescription className="text-lg text-gray-400">
          Choose a conversion type to retrieve ENS information
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6 pt-6">
        <Select
          onValueChange={handleConversionChange}
          defaultValue="address-to-ens-lookup"
        >
          <SelectTrigger className="hover:bg-gray-750 w-full border-gray-700 bg-gray-800 text-gray-100 focus:ring-gray-400">
            <SelectValue placeholder="Select collection type" />
          </SelectTrigger>
          <SelectContent className="border-gray-700 bg-gray-800 text-gray-100">
            <SelectItem defaultChecked value="address-to-ens-lookup">
              Address → ENS
            </SelectItem>
            <SelectItem value="ens-to-address-lookup">ENS → Address</SelectItem>
            <SelectItem value="ens-transfers-by-name">
              ENS Transfers By Name
            </SelectItem>
            <SelectItem value="ens-transfers-by-id">
              ENS Transfers By ID
            </SelectItem>
          </SelectContent>
        </Select>
        <Button
          onClick={handleViewConversion}
          className="mx-auto block w-full max-w-xs transform rounded-md bg-gradient-to-r from-gray-600 to-gray-400 px-6 py-2 text-white transition-all duration-300 hover:scale-105 hover:from-gray-500 hover:to-gray-300"
        >
          View Conversion
        </Button>
      </CardContent>
    </Card>
  );
}
