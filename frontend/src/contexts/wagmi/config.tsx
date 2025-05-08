import { cookieStorage, createStorage } from 'wagmi';
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi';
import {
  mainnet,
  bsc,
  bscTestnet,
  arbitrum,
  sepolia,
  solana,
  solanaTestnet,
  solanaDevnet,
} from '@reown/appkit/networks';
import type { AppKitNetwork } from '@reown/appkit/networks';
import { SolanaAdapter } from '@reown/appkit-adapter-solana';

export const networks: [AppKitNetwork, ...AppKitNetwork[]] = [
  mainnet,
  bsc,
  bscTestnet,
  arbitrum,
  sepolia,
  solana,
  solanaTestnet,
  solanaDevnet,
];

// Get projectId from https://cloud.reown.com
const projectId =
  process.env.REOWN_CLOUD_PROJECT_ID || 'b675b7e440958031e616f93b09d45cc7'; // this is a public projectId only to use on localhost

if (!projectId) {
  throw new Error('Project ID is not defined');
}

// 1. Create the Wagmi adapter
export const wagmiAdapter = new WagmiAdapter({
  ssr: true,
  projectId,
  networks,
});

// 2. Create Solana adapter
export const solanaWeb3JsAdapter = new SolanaAdapter();

// export const networks = [mainnet, bsc] as [AppKitNetwork, ...AppKitNetwork[]];

//Set up the Wagmi Adapter (Config)
// export const wagmiAdapter = new WagmiAdapter({
//   storage: createStorage({
//     storage: cookieStorage,
//   }),
//   ssr: true,
//   projectId,
//   networks,
// });

// export const config = wagmiAdapter.wagmiConfig;
