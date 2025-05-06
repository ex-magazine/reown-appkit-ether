import type { Metadata } from 'next';
import localFont from 'next/font/local';
import '../globals.css';
import { Navbar } from '@/components/ether/movieapps/ui/navbar';
import ReactQueryProvider from '@/lib/ether/movieapps/ReactQueryProvider';
import Footer from '@/components/ether/movieapps/Footer';

import { Toaster } from '@/components/ether/movieapps/ui/sonner';
import PageTransition from '@/components/ether/movieapps/PageTransition';

import { ThemeProvider } from 'next-themes';

import type { Viewport } from 'next';

const geistSans = localFont({
  src: '../../fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: '../../fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: {
    default: 'EVM',
    template: '%s | EVM',
  },
  description:
    'Discover movies, explore details, and find your next favorite film with MoviesPrix.',
  keywords: [
    'movies',
    'films',
    'explore movies',
    'movie database',
    'movie ratings',
    'movie trailers',
  ],
  authors: [
    { name: 'Tommy', url: 'https://github.com/ex-magazine/reown-appkit-ether' },
  ],
  metadataBase: new URL('https://reown-appkit-ether.vercel.app'),
  openGraph: {
    description:
      'Discover movies, explore details, and find your next favorite film with MoviesPrix.',
    url: 'https://reown-appkit-ether.vercel.app',
    siteName: 'MoviesPrix',
    images: [
      {
        url: 'https://moviesprix.vercel.app/banner.png',
        width: 1200,
        height: 630,
        alt: 'MoviesPrix Banner',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    description:
      'Discover movies, explore details, and find your next favorite film with MoviesPrix.',
    images: ['https://reown-appkit-ether.vercel.app/banner.png'],
  },
  manifest: '/site.webmanifest',
  robots: 'index, follow',
};
export const viewport: Viewport = {
  themeColor: 'black',
};

import { FavoritesProvider } from '@/contexts/favorites-context';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <FavoritesProvider>
      <Navbar />
      {/* <PageTransition> */}
      {children}
      {/* </PageTransition> */}
      <Footer />
      <Toaster />
    </FavoritesProvider>
  );
};

export default DashboardLayout;
