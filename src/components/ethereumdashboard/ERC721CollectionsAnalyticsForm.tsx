'use client';

import { useRef, useState } from 'react';
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./ui/card";
import { Alert, AlertDescription } from "./ui/alert";
import addressValidator from '@/utils/functions/addressValidator';
import TopERC721CollectionsInfoTable from './TopERC721CollectionsInfoTable';
import ERC721CollectionDataInfoTable from './ERC721CollectionDataInfoTable';
import ERC721CollectionExtraDataInfoTable from './ERC721CollectionExtraDataInfoTable';
import ERC721CollectionSalesInfoTable from './ERC721CollectionSalesInfoTable';
import ERC721CollectionTransfersInfoTable from './ERC721CollectionTransfersInfoTable';
import ERC721CollectionAttributeSummaryInfoTable from './ERC721CollectionAttributeSummaryInfoTable';
import ERC721CollectionFloorPriceInfoTable from './ERC721CollectionFloorPriceInfoTable';

// ERC721 Collections Analytics Form Custom Component
export default function ERC721CollectionsAnalyticsForm() {
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const collectionAddressRef = useRef<HTMLInputElement>(null);
  const [tableStatus, updateTableStatus] = useState<boolean>(false);

  // Handle Submit Function
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Check address validity
    // If correct, make a request call to fetch ERC20 Collection Analytics data
    if (addressValidator(collectionAddressRef.current!.value.trim())) {
      updateTableStatus(true);
      setShowAlert(false);
    }
    else {
      updateTableStatus(false);
      setShowAlert(true);
    }
  }

  // ERC721 Collection Analytics Form Custom Component
  return (
    <>
      <div className="container mx-auto px-4 w-full max-w-3xl">
        {showAlert && (
          <Alert variant="destructive" className="mb-6">
            <AlertDescription>
              There was an error processing your request. Please try again.
            </AlertDescription>
          </Alert>
        )}
        <Card className="bg-gray-900 border-gray-800 shadow-xl w-full">
          <CardHeader className="border-b border-gray-800 pb-6">
            <CardTitle className="text-3xl font-bold text-gray-100">Analyze Collection</CardTitle>
            <CardDescription className="text-gray-400 text-lg font-light">
              Enter collection address for in-depth analysis
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 pt-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                placeholder="Enter Collection Address"
                ref={collectionAddressRef}
                className="w-full bg-gray-800 text-gray-100 border-gray-700 focus:ring-gray-400 placeholder-gray-500"
                required
              />
              <div className="flex justify-center space-x-4 pt-4">
                <Button
                  type="submit"
                  className="bg-gradient-to-r from-gray-600 to-gray-400 text-white py-2 px-6 rounded-md hover:from-gray-500 hover:to-gray-300 transition-all duration-300 transform hover:scale-105 font-medium"
                >
                  Analyze Collection
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
      {tableStatus ? null : <TopERC721CollectionsInfoTable />}
      {tableStatus ? <ERC721CollectionDataInfoTable address={collectionAddressRef.current!.value.trim()} /> : null}
      {tableStatus ? <ERC721CollectionFloorPriceInfoTable address={collectionAddressRef.current!.value.trim()} /> : null}
      {tableStatus ? <ERC721CollectionExtraDataInfoTable address={collectionAddressRef.current!.value.trim()} /> : null}
      {tableStatus ? <ERC721CollectionAttributeSummaryInfoTable address={collectionAddressRef.current!.value.trim()} /> : null}
      {tableStatus ? <ERC721CollectionTransfersInfoTable address={collectionAddressRef.current!.value.trim()} /> : null}
      {tableStatus ? <ERC721CollectionSalesInfoTable address={collectionAddressRef.current!.value.trim()} /> : null}
    </>
  )
}