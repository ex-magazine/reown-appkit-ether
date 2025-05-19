import Header from '@/components/ether/moviestmdb/layout/Header';
import Footer from '@/components/ether/moviestmdb/layout/Footer';
import { ThemeProvider } from '@/components/ether/moviestmdb/layout/ThemeProvider';
import { Toaster } from 'react-hot-toast';

export const metadata: Metadata = {
  title: 'Movie Application',
  description: 'A movie application built with Next.js',
};

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
      <Header />
      <main className="min-h-[calc(100vh-150px)]">{children}</main>
      <Toaster position="bottom-center" />
      <Footer />
      </ThemeProvider>
    </>
  );
};

export default DashboardLayout;

