import { cookieStorage, createStorage } from '@wagmi/core';
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
  victionTestnet,
  bsc,
} from '@reown/appkit/networks';


import type { AppKitNetwork } from '@reown/appkit/networks';

// Get projectId from https://cloud.reown.com
export const projectId = process.env.REOWN_CLOUD_PROJECT_ID;


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
  victionTestnet,
];



export const wagmiAdapter = new WagmiAdapter({
  storage: createStorage({
    storage: cookieStorage,
  }),
  ssr: true,
  networks,
  projectId
  /*
  transports: {
    [mainnet.id]: http(),
    [bsc.id]: http(),
  }, */
});

export const config = wagmiAdapter.wagmiConfig;
