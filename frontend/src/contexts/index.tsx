'use client';

import { createAppKit } from '@reown/appkit/react';

import { WagmiAdapter } from '@reown/appkit-adapter-wagmi';
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
  victionTestnet,
  polygon,
  AppKitNetwork,
  sepolia,
} from '@reown/appkit/networks';

import { cookieStorage, createStorage } from '@wagmi/core';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React, { type ReactNode } from 'react';
import { cookieToInitialState, WagmiProvider, type Config } from 'wagmi';

// Set up queryClient
const queryClient = new QueryClient();

// 1. Get projectId from https://cloud.reown.com
const projectId = 'b675b7e440958031e616f93b09d45cc7';
// const projectId = process.env.REOWN_CLOUD_PROJECT_ID;

// 2. Create a metadata object - optional
// Set up metadata
const metadata = {
  //this is optional
  name: 'appkit-example',
  description: 'AppKit Example - EVM',
  url: 'https://reown-appkit-evm.vercel.app', // origin must match your domain & subdomain
  icons: ['https://avatars.githubusercontent.com/u/179229932'],
};

// 3. Set the networks
const networks: [AppKitNetwork, ...AppKitNetwork[]] = [
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
  victionTestnet,
];

// 4. Create Wagmi Adapter
export const wagmiAdapter = new WagmiAdapter({
  storage: createStorage({
    storage: cookieStorage,
  }),

  networks,
  projectId,
  ssr: true,
  /*
  transports: {
    [mainnet.id]: http(),
    [bsc.id]: http(),
  }, */
});

// 5. Create modal
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
  networks,
  projectId,
  // defaultNetwork: mainnet,
  metadata,
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
    <WagmiProvider
      config={wagmiAdapter.wagmiConfig as Config}
      initialState={initialState}
    >
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
}

export default ContextProvider;
