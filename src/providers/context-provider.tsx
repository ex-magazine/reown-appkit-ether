'use client';

import { wagmiAdapter, projectId } from '@/config/network';
import { createAppKit } from '@reown/appkit/react';
import {
  mainnet,
  arbitrum,
  scroll,
  morph,
  berachainTestnetbArtio,
  mantle,
  soneium,
  zircuit,
  rootstock,
  abstract,
  viction,
  monadTestnet,
  celo,
  apeChain,
} from '@reown/appkit/networks';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React, { type ReactNode } from 'react';
import { cookieToInitialState, WagmiProvider, type Config } from 'wagmi';

import { useState } from 'react';
import { createConfig, http } from 'wagmi';

import { ReactQueryStreamedHydration } from '@tanstack/react-query-next-experimental';

import StoreProvider from '@/providers/store-provider';
import ThemeProvider from '@/providers/theme-provider';
import Updater from '@/providers/updater';

// Set up queryClient
const queryClient = new QueryClient();

if (!projectId) {
  throw new Error('Project ID is not defined');
}

// Set up metadata
const metadata = {
  //this is optional
  name: 'appkit-example',
  description: 'AppKit Example - EVM',
  url: 'https://reown-appkit-evm.vercel.app', // origin must match your domain & subdomain
  icons: ['https://avatars.githubusercontent.com/u/179229932'],
};

// Create the modal
const modal = createAppKit({
  adapters: [wagmiAdapter],
  chainImages: {
    // Customize networks' logos
    5000: '/mantle.png', // <chainId>: 'www.network.com/logo.png'
    534_352: '/scroll.png',
    80084: '/berachain.png',
    2818: '/morph.png',
    1868: '/soneium.png',
    48900: '/zircuit.svg',
    11_124: '/abstract.png',
    30: '/rootstock.png',
    109: 'https://chewyswap.dog/images/chains/109.png',
    2000: 'https://chewyswap.dog/images/chains/2000.png',
  },
  projectId,
  networks: [
    mainnet,
    arbitrum,
    scroll,
    morph,
    berachainTestnetbArtio,
    mantle,
    soneium,
    zircuit,
    rootstock,
    abstract,
    viction,
    monadTestnet,
    celo,
    apeChain,
  ],
  defaultNetwork: mainnet,
  metadata: metadata,
  features: {
    analytics: true, // Optional - defaults to your Cloud configuration
    email: true, // default to true
    socials: [
      'google',
      'x',
      'github',
      'discord',
      'apple',
      'facebook',
      'farcaster',
    ],
    emailShowWallets: true, // default to true
  },
  themeMode: 'light',
  // themeVariables: {
  //   '--w3m-accent': '#000000',
  // },
});

function ContextProvider({
  children,
  cookies,
}: {
  children: ReactNode;
  cookies: string | null;
}) {
  const initialState = cookieToInitialState(
    wagmiAdapter.wagmiConfig as Config,
    cookies,
  );

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <StoreProvider>
        <WagmiProvider
          config={wagmiAdapter.wagmiConfig as Config}
          initialState={initialState}
        >
          <QueryClientProvider client={queryClient}>
            <ReactQueryStreamedHydration>
              {children}
              <Updater />
            </ReactQueryStreamedHydration>
          </QueryClientProvider>
        </WagmiProvider>
      </StoreProvider>
    </ThemeProvider>
  );
}

export default ContextProvider;
