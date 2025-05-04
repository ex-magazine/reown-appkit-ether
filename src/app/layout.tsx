import type { Metadata, Viewport } from 'next';

import { Inter, Roboto_Mono, Titillium_Web } from 'next/font/google';

import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

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

import ContextProvider from '@/context';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WagmiProvider from '@/context/wagmi/provider';

import { headers } from 'next/headers';
import AppProvider from '@/providers/app-provider';
import { Analytics } from '@vercel/analytics/next';

import MetricsNavbar from '@/components/ethereumdashboard/MetricsNavbar';
import { Geist, Geist_Mono } from 'next/font/google';

import Footer2 from '@/components/ethereumdashboard/Footer2';
import Navbar from '@/components/ethereumdashboard/Navbar';
import Script from 'next/script';

export const metadata: Metadata = {
  metadataBase: new URL('https://reown-appkit-ether.vercel.app'),
  title: 'Stylish Ethereum DApp | AppKit Ethereum Dashboard',
  description:
    'Create your Stylish DApp | Powered by Next.js, lookup everything there is to know within the Ethereum ecosystem',
  keywords: ['DApp', 'Next.js template'],
  openGraph: {
    title: 'Stylish Ethereum DApp',
    description: 'Create your Stylish DApp',
    type: 'website',
    siteName: 'Stylish Ethereum DApp',
    url: '/',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Stylish Ethereum DApp',
    description: 'Create your Stylish DApp',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookies = (await headers()).get('cookie');
  return (
    <html
      lang="en"
      className={`${inter.variable} ${robotoMono.variable} ${titilliumWeb.variable}`}
      suppressHydrationWarning
    >
      <body>
        <AppProvider>
          <ContextProvider cookies={cookies}>
            {/* <WagmiProvider cookies={cookies}> */}
            <Header />
            {children}
            <Footer2 />
            <Footer />
            {/* </WagmiProvider> */}
          </ContextProvider>
        </AppProvider>
      </body>
    </html>
  );
}
