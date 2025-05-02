'use client';

import Hero from '@/components/Hero';
import ContentSection from '@/components/ContentSection';
import { MproAbi } from '@/utils/MproAbi';
import { ethers } from 'ethers';
import Image from 'next/image';
import { useEffect, useState } from "react";
import { etherUnits } from 'viem';
import {
  useAccount,
  useBalance,
  useWriteContract,
  useReadContract,
} from 'wagmi';
import { Address, formatEther, formatUnits } from "viem";

import {
  useAppKitState,
  useAppKitTheme,
  useAppKitEvents,
  useAppKitAccount,
  useWalletInfo,
} from '@reown/appkit/react';


import Link from 'next/link';
import { Button } from '@/components/ethereumdashboard/ui/button';
import HomePageWalletForm from '@/components/ethereumdashboard/HomePageWalletForm';
import HomePageMarketDataSection from '@/components/ethereumdashboard/HomePageMarketDataSection';
import HomePageGlobalMarketCapChart from '@/components/ethereumdashboard/HomePageGlobalMarketCapChart';
import HomePageTrendingCoinsTable from '@/components/ethereumdashboard/HomePageTrendingCoinsTable';
import HomePageTrendingCollectionsTable from '@/components/ethereumdashboard/HomePageTrendingCollectionsTable';
import type { Metadata } from "next"


// import { cookieStorage, createStorage, http } from '@wagmi/core'
import { ConnectButton } from '@/components/ConnectButton';
import { InfoList } from '@/components/InfoList';
import { ActionButtonList } from '@/components/ActionButtonList';
// import erc20Abi from "@/abi/erc20";
const contractAddressMpro = '0x83b37130b8f6a8edd4e34c46a2fed1ac281bfb05'; // Token contract
const contractAddressUSDT = '0x55d398326f99059fF775485246999027B3197955'; // Token contract
const contractABIMpro = MproAbi();

import NoSsr from '@/components/NoSsr';






export default function Home() {
  // const [chewyBalance, setChewyBalance] = useState<string>("")
  const { isConnected, address } = useAccount();
  const { walletInfo } = useWalletInfo()

  // const tokenContract = {
  //   address: '0x2761723006d3Eb0d90B19B75654DbE543dcd974f',
  //   abi: erc20Abi,
  // } as const


  // const { data: tokenData, isError } = useReadContract({
  //   abi: erc20Abi,
  //   address: '0x2761723006d3Eb0d90B19B75654DbE543dcd974f',
  //   functionName: "balanceOf",
  //   args: [address as Address]
  // })


  // useEffect(() => {
  //   if (tokenData) {
  //     setChewyBalance(formatUnits(tokenData as any, 18));
  //   }
  // }, [tokenData, isConnected]);


  const {
    data: usdtBalance,
    isLoading,
    error,
  } = useBalance({
    address: address,
    token: '0x55d398326f99059fF775485246999027B3197955',
  });

  const { data: mproBalance } = useBalance({
    address: address,
    token: '0x83b37130b8f6a8edd4e34c46a2fed1ac281bfb05',
  });

  console.log(isConnected);

  //transfer
  const [amount, setAmount] = useState('');
  const [recipient, setRecipient] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const {
    writeContract,
    isPending: isWriteLoading,
    isSuccess,
    error: isWriteError,
  } = useWriteContract();

  const handleSubmitMpro = (e: any) => {
    e.preventDefault();
    setErrorMessage('');
    if (isNaN(parseFloat(amount)) || amount.trim() === '') {
      return setErrorMessage('Please enter a valid number');
    }
    writeContract({
      address: contractAddressMpro,
      abi: contractABIMpro,
      functionName: 'transfer',
      args: [
        recipient,
        ethers.parseUnits(
          amount.toString() == '' ? '0' : amount.toString(),
          18
        ),
      ],
      chainId: 56, // BSC chainId
    });
  };

  const handleSubmitUSDT = (e: any) => {
    //set error
    e.preventDefault();
    setErrorMessage('');
    if (isNaN(parseFloat(amount)) || amount.trim() === '') {
      return setErrorMessage('Please enter a valid number');
    }

    writeContract({
      address: contractAddressUSDT,
      abi: contractABIMpro,
      functionName: 'transfer',
      args: [
        recipient,
        ethers.parseUnits(
          amount.toString() == '' ? '0' : amount.toString(),
          18
        ),
      ],
      chainId: 56, // BSC chainId
    });
  };

  return (
    <>
      <Hero />
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-6">
          {/* Section Header */}
          <div className="mb-12 text-center">
            <h2 className="text-4xl font-extrabold text-gray-800">
              Build a Web3 App using the AppKit CLI
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
              Reown is a UX-focused company that provides toolkits – AppKit and
              WalletKit – for anyone building onchain to leverage and unlock
              better UX.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-2">
            {/* Feature 1 */}
            <div className="rounded-lg bg-white p-6 shadow">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="h-8 w-8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12h6m-6 0a3 3 0 11-6 0 3 3 0 016 0zm6 0a3 3 0 100-6 3 3 0 000 6zm0 0a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
              <ConnectButton />
            </div>

            {/* Feature 2 */}
            <div className="rounded-lg bg-white p-6 shadow">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="h-8 w-8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <ActionButtonList />
            </div>
          </div>

          <div className="mt-10 grid gap-10 sm:grid-cols-1 lg:grid-cols-1">
            <div className="rounded-lg bg-white p-6 shadow">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="h-8 w-8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4.5v15m7.5-7.5h-15"
                  />
                </svg>
              </div>
              <InfoList />
            </div>
          </div>

          {/* Features Grid */}
          <div className="mt-10 grid gap-10 sm:grid-cols-2 lg:grid-cols-2">
            {/* Feature 1 */}
            <div className="rounded-lg bg-white p-6 shadow">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="h-8 w-8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12h6m-6 0a3 3 0 11-6 0 3 3 0 016 0zm6 0a3 3 0 100-6 3 3 0 000 6zm0 0a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
              <w3m-button />
              {isConnected && (
                <>
                  <p>Connected to {address}</p>
                  {isLoading ? (
                    <p>Loading...</p>
                  ) : (
                    <p>
                      {usdtBalance?.formatted} {usdtBalance?.symbol}
                    </p>
                  )}
                  {isLoading ? (
                    <p>Loading...</p>
                  ) : (
                    <p>
                      {mproBalance?.formatted} {mproBalance?.symbol}
                    </p>
                  )}
                  <br></br>
                  <form className="mx-auto max-w-sm">
                    <div className="mb-5">
                      <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                        To Address
                      </label>
                      <input
                        type="text"
                        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                        placeholder="0x..."
                        required
                        value={recipient}
                        onChange={(e) => setRecipient(e.target.value)}
                      />
                    </div>
                    <div className="mb-5">
                      <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                        Amount
                      </label>
                      <input
                        type="text"
                        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                        placeholder="11"
                        required
                        value={amount}
                        onChange={(e) => setAmount(e.target.value ?? 0)}
                      />
                    </div>
                    <div className="flex w-full flex-row">
                      <button
                        type="submit"
                        disabled={isLoading}
                        onClick={handleSubmitMpro}
                        className="m-1 w-full rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      >
                        Send Mpro
                      </button>
                      <button
                        type="submit"
                        disabled={isLoading}
                        onClick={handleSubmitUSDT}
                        className="m-1 w-full rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      >
                        Send USDT
                      </button>
                    </div>
                    {isSuccess && <p>Transaction successful! Hash: </p>}
                    {error && <p>Error: {error.message}</p>}
                    {errorMessage && <p>Error: {errorMessage}</p>}
                  </form>
                </>
              )}
            </div>

            {/* Feature 2 */}
            <div className="rounded-lg bg-white p-6 shadow">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="h-8 w-8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <NoSsr>
                <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center gap-16 p-8 pb-20 font-[family-name:var(--font-geist-sans)] sm:p-20">
                  <main className="row-start-2 flex flex-col items-center gap-8 sm:items-start">
                    <appkit-button />
                  </main>
                </div>
              </NoSsr>
            </div>
          </div>
















          {/* Features Grid */}
          <div className="mt-10 grid gap-10 sm:grid-cols-2 lg:grid-cols-2">
            {/* Feature 1 */}
            <div className="rounded-lg bg-white p-6 shadow">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="h-8 w-8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12h6m-6 0a3 3 0 11-6 0 3 3 0 016 0zm6 0a3 3 0 100-6 3 3 0 000 6zm0 0a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>

              <div className="grid overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
                <h3 className="bg-gray-100 p-2 text-center text-sm font-semibold">
                  Connect your wallet
                </h3>
                <div className="flex items-center justify-center p-4">
                  <appkit-button />
                </div>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="rounded-lg bg-white p-6 shadow">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="h-8 w-8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              {isConnected && (
                <div className="grid overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
                  <h3 className="bg-gray-100 p-2 text-center text-sm font-semibold">
                    Network selection button
                  </h3>
                  <div className="flex items-center justify-center p-4">
                    <appkit-network-button />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section >

      <ContentSection />
    </>
  );
}














