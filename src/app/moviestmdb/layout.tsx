import Header from '@/components/moviestmdb/layout/Header';
import Footer from '@/components/moviestmdb/layout/Footer';
import { ThemeProvider } from '@/components/moviestmdb/layout/ThemeProvider';
import { Toaster } from 'react-hot-toast';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
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
  );
};

export default DashboardLayout;
