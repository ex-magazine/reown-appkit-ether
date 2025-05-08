import Header from '@/components/ether/moviestmdb/layout/Header';
import Footer from '@/components/ether/moviestmdb/layout/Footer';

import { Toaster } from 'react-hot-toast';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      <main className="min-h-[calc(100vh-150px)]">{children}</main>
      <Toaster position="bottom-center" />
      <Footer />
    </>
  );
};

export default DashboardLayout;
