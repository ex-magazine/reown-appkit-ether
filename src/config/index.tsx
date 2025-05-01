import { cookieStorage, createStorage, http } from '@wagmi/core';
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
  arbitrumSepolia,
  bsc,
} from '@reown/appkit/networks';

import type { AppKitNetwork } from '@reown/appkit/networks';

// Get projectId from https://cloud.reown.com
export const projectId = process.env.NEXT_PUBLIC_PROJECT_ID;

if (!projectId) {
  throw new Error('Project ID is not defined');
}

export const networks = [
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
  arbitrumSepolia,
  bsc,
];

//Set up the Wagmi Adapter (Config)
export const wagmiAdapter = new WagmiAdapter({
  storage: createStorage({
    storage: cookieStorage,
  }),
  ssr: true,
  networks,
  projectId,
  /*
  transports: {
    [mainnet.id]: http(),
    [bsc.id]: http(),
  }, */
});

export const config = wagmiAdapter.wagmiConfig;
