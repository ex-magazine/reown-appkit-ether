import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

import ContextProvider from '@/context';
import Header from '@/components/Header'; // Added import for Header
import Footer from '@/components/Footer'; // Added import for Footer
import WagmiProvider from '@/context/wagmi/provider';

import { headers } from 'next/headers'; // added

export const metadata: Metadata = {
  title: 'AppKit Example App',
  description: 'Powered by WalletConnect',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookies = (await headers()).get('cookie');
  return (
    <html lang="en">
      <body className={inter.className}>
        <ContextProvider cookies={cookies}>
          {/* <WagmiProvider cookies={cookies}> */}
          <Header />
          {children}
          <Footer />
          {/* </WagmiProvider> */}
        </ContextProvider>
      </body>
    </html>
  );
}
