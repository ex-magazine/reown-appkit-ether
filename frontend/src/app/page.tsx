'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useSession } from 'next-auth/react';
import { Ticket, Wrench, MessageCircle } from 'lucide-react';
import { Navbar } from '@/components/navbar';
import { Sidebar } from '@/components/sidebar';
import { useMobile } from '@/hooks/useMobile';
import { useEffect } from 'react';
import { FooterLinks } from '@/utils/constants/FooterLinks';
import { ExternalLink } from 'lucide-react';
import Footer from '@/components/ether/movieapps/Footer';
import Hero from '@/components/ether/Hero';
import type { Metadata, Viewport } from 'next';
import { MproAbi } from '@/utils/MproAbi';

import Image from 'next/image';
import { useState } from 'react';
import { etherUnits } from 'viem';
import {
  useAccount,
  useBalance,
  useWriteContract,
  useReadContract,
} from 'wagmi';
import { Address, formatEther, formatUnits } from 'viem';

import {
  useAppKitState,
  useAppKitTheme,
  useAppKitEvents,
  useAppKitAccount,
  useWalletInfo,
} from '@reown/appkit/react';

import { ConnectButton } from '@/components/ether/ConnectButton';
import { InfoList } from '@/components/ether/InfoList';

import NoSsr from '@/components/ether/NoSsr';


/*
export const metadata: Metadata = {
  // title: {
  //     default: 'MoviesPrix - Explore Movies',
  //     template: '%s | MoviesPrix',
  // },
  title: 'Develop Dapps',
  description: 'Discover movies, explore details, and find your next favorite film with MoviesPrix.',
  keywords: ['movies', 'films', 'explore movies', 'movie database', 'movie ratings', 'movie trailers'],
  authors: [{ name: 'Tommy', url: 'https://github.com/ex-magazine/reown-appkit-ether' }],
  metadataBase: new URL('https://reown-appkit-ether.vercel.app'),
  openGraph: {
      description: 'Discover movies, explore details, and find your next favorite film with MoviesPrix.',
      url: 'https:/reown-appkit-ether.vercel.app',
      siteName: 'MoviesPrix',
      images: [
          {
              url: 'https://reown-appkit-ether.vercel.app/banner.png',
              width: 1200,
              height: 630,
              alt: 'MoviesPrix Banner',
          },
      ],
      type: 'website',
  },
  twitter: {
      card: 'summary_large_image',
      description: 'Discover movies, explore details, and find your next favorite film with MoviesPrix.',
      images: ['https://reown-appkit-ether.vercel.app/banner.png'],
  },
  manifest: '/site.webmanifest',
  robots: 'index, follow',
};

export const viewport: Viewport = {
  themeColor: 'white',
};
*/
export default function HomePage() {
  const { data: session } = useSession();
  const url = session ? '/dashboard' : '/login';

  const { isConnected, address } = useAccount();
  const { walletInfo } = useWalletInfo();

  const {
    data: usdtBalance,
    isLoading,
    error,
  } = useBalance({
    address: address,
    token: '0x55d398326f99059fF775485246999027B3197955',
  });

  const { data: mproBalance } = useBalance({
    address: address,
    token: '0x83b37130b8f6a8edd4e34c46a2fed1ac281bfb05',
  });

  //transfer
  const [amount, setAmount] = useState('');
  const [recipient, setRecipient] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const { isMobileOpen, setIsMobileOpen, isInitialized, setInitialized } =
    useMobile();

  // Ensure sidebar is closed on initial load
  useEffect(() => {
    if (!isInitialized) {
      setIsMobileOpen(false);
      setInitialized(true);
    }
  }, [isInitialized, setInitialized, setIsMobileOpen]);

  const features = [
    {
      icon: <Ticket className="h-8 w-8" />,
      title: 'Simple & Intuitive',
      description:
        'Easy-to-use interface designed for efficient ticket management.',
    },
    {
      icon: <Wrench className="h-8 w-8" />,
      title: 'Blockchain Powered',
      description: 'Immutable ticket history with transparent tracking.',
    },
    {
      icon: <MessageCircle className="h-8 w-8" />,
      title: 'Team Collaboration',
      description:
        'Work together seamlessly with built-in commenting and updates.',
    },
  ];

  return (
    <div className="flex min-h-screen flex-col">
      {/* Backdrop for mobile sidebar */}
      {isMobileOpen && (
        <div
          onClick={() => setIsMobileOpen(false)}
          className="fixed inset-0 bg-black/70 z-40"
        />
      )}
      {/* Sidebar with mobile state */}
      <div
        className={`fixed top-0 left-0 h-screen w-64 transition-transform duration-300 ease-in-out z-50 ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <Sidebar
          mobileOpen={isMobileOpen}
          onMobileOpenChange={setIsMobileOpen}
        />
      </div>
      {/* Navbar with mobile toggle */}
      <Navbar onMobileMenuClick={() => setIsMobileOpen(!isMobileOpen)} />

      <Hero />
      {/* <MainSection /> */}

      {/* Main Content */}
      <section className="flex flex-1 flex-col items-center justify-center px-4 pt-20">
        <div className="mx-auto w-full space-y-12 text-center">
          {/* Hero Section */}
          <div className="space-y-8">
            <h2 className="text-4xl font-bold tracking-tight sm:text-6xl">
              Build a Web3 App using the AppKit CLI
            </h2>
            <p className="mx-auto max-w-5xl text-xl text-muted-foreground">
              Reown is a UX-focused company that provides toolkits – AppKit and
              WalletKit – for anyone building onchain to leverage and unlock
              better UX.
            </p>
          </div>

          {/* Features Section */}
          <div className="mx-auto  w-full space-y-12">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
              <div className="space-y-4 rounded-lg border bg-card p-6 text-center shadow-sm">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="h-8 w-8"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12h6m-6 0a3 3 0 11-6 0 3 3 0 016 0zm6 0a3 3 0 100-6 3 3 0 000 6zm0 0a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <ConnectButton />
              </div>

              <div className="space-y-4 rounded-lg border bg-card p-6 text-center shadow-sm">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="h-8 w-8"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <NoSsr>
                  <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center gap-16 p-8 pb-20 font-[family-name:var(--font-geist-sans)] sm:p-20">
                    <main className="row-start-2 flex flex-col items-center gap-8 sm:items-start">
                      <appkit-button />
                    </main>
                  </div>
                </NoSsr>
              </div>

              <div className="space-y-4 rounded-lg border bg-card p-6 text-center shadow-sm">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="h-8 w-8"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 4.5v15m7.5-7.5h-15"
                    />
                  </svg>
                </div>
                <appkit-network-button />
              </div>
            </div>
          </div>

          <div className="mx-auto  w-full space-y-12">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
              <div className="space-y-4 rounded-lg border bg-card p-6 text-center shadow-sm">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="h-8 w-8"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12h6m-6 0a3 3 0 11-6 0 3 3 0 016 0zm6 0a3 3 0 100-6 3 3 0 000 6zm0 0a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <w3m-button />
              </div>

              <div className="space-y-4 rounded-lg border bg-card p-6 text-center shadow-sm">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="h-8 w-8"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <p>
                  Learn about the common protocols within the Ethereum
                  ecosystem. Full list of the protocols can be found here.
                </p>
              </div>
            </div>
          </div>

          <div className="mx-auto  w-full space-y-12">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-1">
              <div className="space-y-4 rounded-lg border bg-card p-6 text-center shadow-sm">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="h-8 w-8"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 4.5v15m7.5-7.5h-15"
                    />
                  </svg>
                </div>
                <InfoList />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}

      <section className="flex flex-1 flex-col items-center justify-center px-4 pt-20">
        <div className="mx-auto max-w-7xl space-y-12 text-center">
          {/* Hero Section */}
          <div className="space-y-8">
            <h2 className="text-4xl font-bold tracking-tight sm:text-6xl">
              Why Choose AppKit Connect?
            </h2>
            <p className="mx-auto max-w-2xl text-xl text-muted-foreground">
              Discover how AppKit Connect simplifies blockchain integration and
              empowers your DApp development.
            </p>
          </div>

          {/* Features Section */}
          <div className="mx-auto max-w-7xl space-y-12">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
              <div className="space-y-4 rounded-lg border bg-card p-6 text-center shadow-sm">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="h-8 w-8"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12h6m-6 0a3 3 0 11-6 0 3 3 0 016 0zm6 0a3 3 0 100-6 3 3 0 000 6zm0 0a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <h2 className="text-xl font-semibold">
                  Seamless Wallet Integration
                </h2>
                <p className="text-muted-foreground">
                  Connect to Web3 wallets effortlessly with built-in tools like
                  Web3Modal and Wagmi.
                </p>
              </div>

              <div className="space-y-4 rounded-lg border bg-card p-6 text-center shadow-sm">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="h-8 w-8"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <h2 className="text-xl font-semibold">EVM Compatibility</h2>
                <p className="text-muted-foreground">
                  Works seamlessly with Ethereum, Polygon, Flare, and other
                  EVM-compatible blockchains.
                </p>
              </div>

              <div className="space-y-4 rounded-lg border bg-card p-6 text-center shadow-sm">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="h-8 w-8"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 4.5v15m7.5-7.5h-15"
                    />
                  </svg>
                </div>
                <h2 className="text-xl font-semibold">
                  {' '}
                  Easy Smart Contract Interaction
                </h2>
                <p className="text-muted-foreground">
                  Use prebuilt hooks like <code>useReadContract</code> and{' '}
                  <code>useWriteContract</code>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="flex flex-1 flex-col items-center justify-center px-4 pt-20">
        <div className="mx-auto max-w-7xl space-y-12 text-center">
          {/* Hero Section */}
          <div className="space-y-8">
            <h2 className="text-4xl font-bold tracking-tight sm:text-6xl">
              Modern Ticket Management
            </h2>
            <p className="mx-auto max-w-2xl text-xl text-muted-foreground">
              Streamline your support workflow with our intuitive ticket
              management system. Track issues, collaborate with your team, and
              resolve tickets efficiently with blockchain-powered tracking.
            </p>
            <div className="space-y-4">
              <Button size="lg" className="h-12 px-8 text-lg" asChild>
                <Link href={url}>
                  {session ? 'Access Dashboard' : 'Get Started'}
                </Link>
              </Button>
              <p className="text-sm text-muted-foreground">
                {session
                  ? 'Continue to dashboard'
                  : 'No account required to try'}
              </p>
            </div>
          </div>

          {/* Visual Element (Generic ticketing system image) */}
          <div className="relative mx-auto max-w-6xl">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl blur-3xl" />
            <div className="relative rounded-xl border bg-card p-8 shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1556745757-8d76bdb6984b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
                alt="Ticket Management System"
                className="rounded-lg w-full h-auto"
              />
            </div>
          </div>

          {/* Features Section */}
          <div className="mx-auto max-w-7xl space-y-12">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="space-y-4 rounded-lg border bg-card p-6 text-center shadow-sm"
                >
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    {feature.icon}
                  </div>
                  <h2 className="text-xl font-semibold">{feature.title}</h2>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="mx-auto max-w-4xl space-y-8 text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Ready to streamline your support workflow?
            </h2>
            <p className="mx-auto max-w-2xl text-xl text-muted-foreground">
              Join thousands of teams using our ticket management system to
              deliver exceptional support.
            </p>
            <Button size="lg" className="h-12 px-8 text-lg" asChild>
              <Link href={url}>
                {session ? 'Access Dashboard' : 'Get Started'}
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-card mt-16">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {/* Company Info */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Ticket className="h-6 w-6 dark:text-white text-black" />
                <span className="font-mono text-xl tracking-tight dark:text-white text-black">
                  Appkit
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                Deep dive into wallet information, price action, and much more!
              </p>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/moviestmdb/home"
                    className="text-sm text-muted-foreground hover:text-primary"
                  >
                    Movies TMDB
                  </Link>
                </li>             
                <li>
                  <Link
                    href="/moviesprix/home"
                    className="text-sm text-muted-foreground hover:text-primary"
                  >
                    Movies Prix
                  </Link>
                </li>

                  <li>
                  <Link
                    href="/oktaycolakoglu/home"
                    className="text-sm text-muted-foreground hover:text-primary"
                  >
                    Movies Oktaycolakoglu
                  </Link>
                </li>

                
              </ul>
            </div>

            {/* Resources */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/moviesprix/search"
                    className="text-sm text-muted-foreground hover:text-primary"
                  >
                    Search
                  </Link>
                </li>
                <li>
                  <Link
                    href="/moviesprix/movies"
                    className="text-sm text-muted-foreground hover:text-primary"
                  >
                    Movies
                  </Link>
                </li>
                <li>
                  <Link
                    href="/moviesprix/favorites"
                    className="text-sm text-muted-foreground hover:text-primary"
                  >
                    Favorites
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold">Contact</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="#"
                    className="text-sm text-muted-foreground hover:text-primary"
                  >
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-sm text-muted-foreground hover:text-primary"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-sm text-muted-foreground hover:text-primary"
                  >
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="flex w-full flex-wrap justify-center gap-4 md:w-auto mt-12">
            {FooterLinks.ecosystem.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-muted-foreground hover:text-primary group flex items-center"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="font-mono tracking-wider">
                  {link.name}
                  {'  '}
                </span>
                <ExternalLink className="ml-1 h-4 w-4 text-muted-foreground hover:text-primary" />
              </Link>
            ))}
          </div>
        </div>
      </footer>
      <Footer />
    </div>
  );
}
