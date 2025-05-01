import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { Navbar } from '@/components/movieapps/ui/navbar';
import ReactQueryProvider from '@/lib/movieapps/ReactQueryProvider';
import Footer from '@/components/movieapps/Footer';

// import { Toaster } from "@/components/ui/toaster";
import { Toaster } from '@/components/movieapps/ui/sonner';
import PageTransition from '@/components/movieapps/PageTransition';

import { NextSSRPlugin } from '@uploadthing/react/next-ssr-plugin';
import { ThemeProvider } from 'next-themes';
import { extractRouterConfig } from 'uploadthing/server';
import { fileRouter } from './api/uploadthing/core';

import type { Viewport } from 'next';
import { GoogleAnalytics } from '@next/third-parties/google';
import { Analytics } from '@vercel/analytics/react';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
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
    { name: 'Prateek Singh', url: 'https://github.com/devxprite/MoviesPrix' },
  ],
  metadataBase: new URL('https://moviesprix.vercel.app'),
  openGraph: {
    description:
      'Discover movies, explore details, and find your next favorite film with MoviesPrix.',
    url: 'https://moviesprix.vercel.app',
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
    images: ['https://moviesprix.vercel.app/banner.png'],
  },
  manifest: '/site.webmanifest',
  robots: 'index, follow',
};
export const viewport: Viewport = {
  themeColor: 'black',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <GoogleAnalytics gaId="G-Y94T96FRD7" />
        <Analytics />
        <NextSSRPlugin routerConfig={extractRouterConfig(fileRouter)} />
        <ReactQueryProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Navbar />
            {/* <PageTransition> */}
            {children}
            {/* </PageTransition> */}
            <Footer />
          </ThemeProvider>
        </ReactQueryProvider>
        <Toaster />
      </body>
    </html>
  );
}
