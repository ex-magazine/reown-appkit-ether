import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

import ContextProvider from '@/context';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WagmiProvider from '@/context/wagmi/provider';

import { headers } from 'next/headers';



import { Analytics } from '@vercel/analytics/next';

import MetricsNavbar from "@/components/ethereumdashboard/MetricsNavbar";
import { Geist, Geist_Mono } from "next/font/google";

import Footer2 from "@/components/ethereumdashboard/Footer2";
import Navbar from "@/components/ethereumdashboard/Navbar";
import Script from "next/script";








export const metadata: Metadata = {
  title: 'AppKit Ethereum Dashboard',
  description: 'Powered by Next.js, lookup everything there is to know within the Ethereum ecosystem',
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
          <Footer2 />
          <Footer />
          {/* </WagmiProvider> */}
        </ContextProvider>
      </body>
    </html>
  );
}
