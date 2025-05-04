'use client';

import { useRef, useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './ui/card';
import { Input } from './ui/input';
import { Alert, AlertDescription } from './ui/alert';
import { Button } from './ui/button';
import addressValidator from '@/utils/functions/addressValidator';
import TransactionBalanceInfoTable from './TransactionBalanceInfoTable';
import WalletStatsInfoTable from './WalletStatsInfoTable';
import WalletPnLBreakdownInfoTable from './WalletPnLBreakdownInfoTable';
import WalletPnLInfoTable from './WalletPnLInfoTable';

// Wallet Analytics Form Custom Component
export default function WalletAnalyticsForm() {
  const walletAddressRef = useRef<HTMLInputElement>(null);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [tableStatus, updateTableStatus] = useState<boolean>(false);

  // Validate wallet address and proceed to presenting information
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (addressValidator(walletAddressRef.current!.value.trim())) {
      setShowAlert(false);
      updateTableStatus(true);
    } else {
      setShowAlert(true);
      updateTableStatus(false);
    }
  };

  // Render the Wallet Analytics Form
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
              Analyze Wallet
            </CardTitle>
            <CardDescription className="text-lg font-light text-gray-400">
              Enter wallet address for in-depth analysis
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 pt-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                placeholder="Enter Wallet Address"
                ref={walletAddressRef}
                className="w-full border-gray-700 bg-gray-800 text-gray-100 placeholder-gray-500 focus:ring-gray-400"
                required
              />
              <div className="flex justify-center space-x-4 pt-4">
                <Button
                  type="submit"
                  className="transform rounded-md bg-gradient-to-r from-gray-600 to-gray-400 px-6 py-2 font-medium text-white transition-all duration-300 hover:scale-105 hover:from-gray-500 hover:to-gray-300"
                >
                  Analyze Wallet
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
      {tableStatus ? (
        <TransactionBalanceInfoTable
          address={walletAddressRef.current!.value.trim()}
          network="eth"
        />
      ) : null}
      {tableStatus ? (
        <WalletStatsInfoTable
          address={walletAddressRef.current!.value.trim()}
        />
      ) : null}
      {tableStatus ? (
        <WalletPnLInfoTable address={walletAddressRef.current!.value.trim()} />
      ) : null}
      {tableStatus ? (
        <WalletPnLBreakdownInfoTable
          address={walletAddressRef.current!.value.trim()}
        />
      ) : null}
    </>
  );
}
