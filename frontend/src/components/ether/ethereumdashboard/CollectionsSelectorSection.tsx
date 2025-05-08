'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Button } from './ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './ui/card';

// Collections Selector Section Custom Component
export default function CollectionsSelectorSection() {
  const router = useRouter();
  const [collectionURL, setCollectionURL] =
    useState<string>('erc20-collection');

  // Dynamically handle collection URL settings
  const handleCollectionChange = (value: string) => {
    setCollectionURL(value);
  };

  // Push endpoint value to /collections path
  const handleViewCollection = () => {
    router.push(`/collections/${collectionURL}`);
  };

  // Render the Collections Selector Section Custom Component
  return (
    <div className="container mx-auto w-full max-w-3xl px-4">
      <Card className="w-full border-gray-800 bg-gray-900 shadow-xl">
        <CardHeader className="border-b border-gray-800 pb-6">
          <CardTitle className="text-3xl text-gray-100">
            Select Collection Type
          </CardTitle>
          <CardDescription className="text-lg text-gray-400">
            Choose a collection type to explore detailed information
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 pt-6">
          <Select
            onValueChange={handleCollectionChange}
            defaultValue="erc20-collection"
          >
            <SelectTrigger className="hover:bg-gray-750 w-full border-gray-700 bg-gray-800 text-gray-100 focus:ring-gray-400">
              <SelectValue placeholder="Select collection type" />
            </SelectTrigger>
            <SelectContent className="border-gray-700 bg-gray-800 text-gray-100">
              <SelectItem value="erc20-collection">
                ERC20 Collection Analytics
              </SelectItem>
              <SelectItem value="erc721-collection">
                ERC721 Collection Analytics
              </SelectItem>
            </SelectContent>
          </Select>
          <Button
            onClick={handleViewCollection}
            className="mx-auto block w-full max-w-xs transform rounded-md bg-gradient-to-r from-gray-600 to-gray-400 px-6 py-2 text-white transition-all duration-300 hover:scale-105 hover:from-gray-500 hover:to-gray-300"
          >
            View Collection Form
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
