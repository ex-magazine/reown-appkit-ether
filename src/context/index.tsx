'use client'

import { wagmiAdapter, projectId } from "@/config";
import { createAppKit } from "@reown/appkit";
import { mainnet, arbitrum } from "@reown/appkit/networks";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, {type ReactNode} from "react";
import { cookieToInitialState, WagmiProvider, type Config } from "wagmi";

const queryClient = new QueryClient();

if (!projectId) {
  throw new Error("Project Id is not define");
}

const metadata = {
  name: "Etherium",
  description: "Etherium",
  url: "https://example.com",
  icons: ["https://avatars.githubusercontent.com/u/4709859"],
}

const modal = createAppKit({
  adapters: [wagmiAdapter],
  projectId,
  networks: [mainnet, arbitrum],
  defaultNetwork: mainnet,
  features: {
    analytics: true,
    email: true,
    socials: ['google', 'x', 'github', 'facebook', 'farcaster'],
    emailShowWallets: true,
  },
  themeMode: 'light'
})



