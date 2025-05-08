'use client';

import { useRef, useState } from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Alert, AlertDescription } from './ui/alert';
import {
  Card,
  CardHeader,
  CardContent,
  CardDescription,
  CardTitle,
} from './ui/card';
import addressValidator from '../utils/functions/addressValidator';
import ERC20TokenInformationSection from './ERC20TokenInformationSection';

// ERC20 Token Prices Form Custom Component
export default function ERC20TokenPricesForm() {
  const tokenAddressRef = useRef<HTMLInputElement>(null);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [tableStatus, updateTableStatus] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Handle form submission logic here
    if (addressValidator(tokenAddressRef.current!.value.trim())) {
      setShowAlert(false);
      updateTableStatus(true);
    } else {
      setShowAlert(true);
      updateTableStatus(false);
    }
  };

  // Render the ERC20 Token Prices Form Component
  return (
    <>
      <div className="container mx-auto w-full max-w-3xl px-4">
        {showAlert && (
          <Alert variant="destructive" className="mb-6">
            <AlertDescription>
              There was an error processing your request. Please try again.
            </AlertDescription>
          </Alert>
        )}
        <Card className="w-full border-gray-800 bg-gray-900 shadow-xl">
          <CardHeader className="border-b border-gray-800 pb-6">
            <CardTitle className="text-3xl font-bold text-gray-100">
              Analyze Token Price
            </CardTitle>
            <CardDescription className="text-lg font-light text-gray-400">
              Enter token address for in-depth analysis
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 pt-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                placeholder="Enter Token Address"
                ref={tokenAddressRef}
                className="w-full border-gray-700 bg-gray-800 text-gray-100 placeholder-gray-500 focus:ring-gray-400"
                required
              />
              <div className="flex justify-center space-x-4 pt-4">
                <Button
                  type="submit"
                  className="transform rounded-md bg-gradient-to-r from-gray-600 to-gray-400 px-6 py-2 font-medium text-white transition-all duration-300 hover:scale-105 hover:from-gray-500 hover:to-gray-300"
                >
                  Analyze Token Price
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
      {tableStatus ? (
        <ERC20TokenInformationSection
          address={tokenAddressRef.current!.value.trim()}
        />
      ) : null}
    </>
  );
}
