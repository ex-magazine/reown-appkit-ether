import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from 'sonner';
import './globals.css';

import { ClientProviders } from '@/providers/client-providers';
import NexTopLoader from 'nextjs-toploader';
import { CreateTicketFAB } from '@/components/create-ticket-fab';

import ContextProvider from '@/contexts';

import { headers } from 'next/headers';

import Navbar from '@/components/ether/ethereumdashboard/Navbar';

import { Inter, Roboto_Mono, Titillium_Web } from 'next/font/google';

import './globals.css';

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
