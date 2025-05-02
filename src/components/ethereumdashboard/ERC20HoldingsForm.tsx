"use client";

import { useRef, useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./ui/card";
import { Alert, AlertDescription } from "./ui/alert";
import addressValidator from "@/utils/functions/addressValidator";
import NetworkSelector from "./NetworkSelector";
import ERC20TransfersInfoTable from "./ERC20TransfersInfoTable";
import ERC20HoldingsInfoTable from "./ERC20HoldingsInfoTable";
import ERC20HoldingsType from "@/utils/types/ERC20HoldingsType";
import ERC20TransfersType from "@/utils/types/ERC20TransfersType";

// ERC20 Holdings Form Custom Component
export default function ERC20HoldingsForm() {
  const walletAddressRef = useRef<HTMLInputElement>(null);
  const [network, updateNetwork] = useState<string>("eth");
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [erc20Holdings, updateERC20Holdings] = useState<ERC20HoldingsType[]>();
  const [erc20Transfers, updateERC20Transfers] = useState<ERC20TransfersType[]>();

  // Handle form submissions here
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Handle form submission logic here
    if (!addressValidator(walletAddressRef.current!.value.trim())) {
      setShowAlert(true);
    }
    else {
      // FETCH API for ERC20 Holdings and Transfers data from a given wallet address
      setShowAlert(false);

      const erc20HoldingsData = await fetch('/api/address-erc20-holdings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ address: walletAddressRef.current!.value.trim(), network })
      });

      const erc20TransfersData = await fetch('/api/address-erc20-transfers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ address: walletAddressRef.current!.value.trim(), network })
      });

      // Check the status of ERC20 Holdings Data
      if (erc20HoldingsData.ok) {
        const erc20HoldingsResponse = await erc20HoldingsData.json();
        updateERC20Holdings(erc20HoldingsResponse);
      }
      else {
        throw new Error();
      }

      // Check the status of ERC20 Transfers Data
      if (erc20TransfersData.ok) {
        const erc20TransfersResponse = await erc20TransfersData.json();
        updateERC20Transfers(erc20TransfersResponse.result);
      }
      else {
        throw new Error();
      }
    }
  }

  // Network Selection Handler Function
  const handleNetworkChange = (selectedNetwork: string) => {
    updateNetwork(selectedNetwork);
  }

  // Render the ERC20 Holdings Form component
  return (
    <>
      <div className="container mx-auto px-4 w-full max-w-3xl">
        {showAlert && (
          <Alert variant="destructive" className="mb-6">
            <AlertDescription>
              There was an error processing your request. Please enter a valid wallet address.
            </AlertDescription>
          </Alert>
        )}
        <Card className="bg-gray-900 border-gray-800 shadow-xl mt-10 w-full">
          <CardHeader className="border-b border-gray-800 pb-6">
            <CardTitle className="text-3xl font-bold text-gray-100">Analyze Holdings</CardTitle>
            <CardDescription className="text-gray-400 text-lg font-light">
              Enter wallet address for in-depth analysis
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 pt-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                placeholder="Enter Wallet Address"
                ref={walletAddressRef}
                type="text"
                className="w-full bg-gray-800 text-gray-100 border-gray-700 focus:ring-gray-400 placeholder-gray-500"
                required
              />
              <NetworkSelector networkSelector={handleNetworkChange} />
              <div className="flex justify-center space-x-4 pt-4">
                <Button
                  type="submit"
                  className="bg-gradient-to-r from-gray-600 to-gray-400 text-white py-2 px-6 rounded-md hover:from-gray-500 hover:to-gray-300 transition-all duration-300 transform hover:scale-105 font-medium"
                >
                  Analyze Holdings
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
      {erc20Holdings ? <ERC20HoldingsInfoTable data={erc20Holdings} /> : null}
      {erc20Transfers ? <ERC20TransfersInfoTable data={erc20Transfers} address={walletAddressRef.current!.value.trim()} /> : null}
    </>
  )
}