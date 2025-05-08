'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createAppKit } from '@reown/appkit/react';

import { cookieToInitialState, WagmiProvider } from 'wagmi';
import React, { type ReactNode } from 'react';
import { cookieStorage, createStorage, http } from '@wagmi/core';
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi';
import { mainnet, bsc } from '@reown/appkit/networks';

const projectId = process.env.REOWN_CLOUD_PROJECT_ID;

if (!projectId) {
  throw new Error('Project ID is not defined');
}

export const networks = [mainnet, bsc];

//Set up the Wagmi Adapter (Config)
export const wagmiAdapter = new WagmiAdapter({
  storage: createStorage({
    storage: cookieStorage,
  }),
  ssr: true,
  projectId,
  networks,
  /*
  transports: {
    [mainnet.id]: http(),
    [bsc.id]: http(),
  }, */
});

export const config = wagmiAdapter.wagmiConfig;

// Set up queryClient
const queryClient = new QueryClient();


// Set up metadata
const metadata = {
  name: 'Banzai Game 2.0',
  description: 'AppKit Example',
  url: 'https://banzai.meme', // origin must match your domain & subdomain
  icons: ['https://banzai.meme/icons/big-flag.png'],
};

// Create the modal
const modal = createAppKit({
  adapters: [wagmiAdapter],
  projectId,
  networks: [mainnet, bsc],
  // defaultNetwork: mainnet,
  metadata: metadata,
  themeMode: 'light',
  features: {
    connectMethodsOrder: ['wallet'],
    swaps: false,
    analytics: true, // Optional - defaults to your Cloud configuration
  },
});

function ContextProviderBanZai({
  children,
  cookies,
}: {
  children: ReactNode;
  cookies: string | null;
}) {
  const initialState = cookieToInitialState(wagmiAdapter.wagmiConfig, cookies);

  return (
    <WagmiProvider
      config={wagmiAdapter.wagmiConfig}
      initialState={initialState}
    >
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
}

export default ContextProviderBanZai;
