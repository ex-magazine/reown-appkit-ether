import type { Metadata } from "next";
import { Inter, Roboto_Mono } from 'next/font/google'
import "./globals.css";
import { headers } from "next/headers"; 
import WagmiProvider from "@/wagmi/provider";

export const metadata: Metadata = {
  title: "AppKit Example App",
  description: "Powered by WalletConnect",
};


const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})
 
const roboto_mono = Roboto_Mono({
  subsets: ['latin'],
  variable: '--font-roboto-mono',
  display: 'swap',
})


export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headersList = await headers();
  const rawCookie = headersList.get("cookie");

  return (
    <html lang="en" className={`${inter.variable} ${roboto_mono.variable}`}>
      <body>
        <WagmiProvider cookies={rawCookie}>{children}</WagmiProvider>
      </body>
    </html>
  );
}



