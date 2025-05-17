import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from 'sonner';
import './globals.css';
import type { Metadata, Viewport } from 'next';
import { ClientProviders } from '@/providers/client-providers';
import NexTopLoader from 'nextjs-toploader';
import { CreateTicketFAB } from '@/components/create-ticket-fab';

import ContextProvider from '@/contexts';

import { headers } from 'next/headers';

import Navbar from '@/components/ether/ethereumdashboard/Navbar';

import { Inter, Roboto_Mono, Titillium_Web } from 'next/font/google';



const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto-mono',
});

const titilliumWeb = Titillium_Web({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-titillium-web',
  style: ['normal'],
  weight: ['400'],
});

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: {
        default: 'Software Development Lifecycle (SDLC) | DevContainers | DevLake | Microservices architectures',
        template: '%s | VPC, EC2, ALB, ECS, S3, RDS, Lambda, Cloudwatch',
    },
    description: 'DeFi protocols like Uniswap, Aave, MakerDao',
    keywords: ['chain development toolkits such as Arbitrum Orbit',
       'Foundry, Viem, Hardhat, and Ether.', 'TypeScript, Next.js, and React', 
       'Layer 2 solutions, wallets, and ERC standards ( ERC-20, ERC- 721)', 
       'Web3 technologies (EVM, Solidity, ethers.js/web3.js)', 'real-time systems (WebSockets, WebRTC)'],
    authors: [{ name: 'Tommy', url: 'https://github.com/ex-magazine' }],
    metadataBase: new URL('https://reown-appkit-ether.vercel.app/'),
    openGraph: {
        description: 'DevOps tools (Docker, Kubernetes, CI/CD pipelines)/ cloud platforms such as AWS, GCP, or Azure',
        url: 'https://reown-appkit-ether.vercel.app/',
        siteName: 'Deep understanding of non-EVM blockchains',
        images: [
            {
                url: 'https://reown-appkit-ether.vercel.app/banner.png',
                width: 1200,
                height: 630,
                alt: 'smart contracts (Solidity, Rust, etc.)',
            },
        ],
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        description: 'Networking protocols: TCP/IP, UDP, HTTP and WebSocket',
        images: ['https://reown-appkit-ether.vercel.app/banner.png'],
    },
    manifest: '/site.webmanifest',
    robots: 'index, follow',
};

export const viewport: Viewport = {
    themeColor: 'white',
};


export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  const cookies = (await headers()).get('cookie');
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <NexTopLoader color="#3B82F6" showSpinner={false} />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ContextProvider cookies={cookies}>
            <ClientProviders session={session}>
              <Navbar />
              {children}

              <CreateTicketFAB />
              <Toaster richColors closeButton position="top-right" />
            </ClientProviders>
          </ContextProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
