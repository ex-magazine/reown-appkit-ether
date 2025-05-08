import { Analytics } from '@vercel/analytics/next';

import MetricsNavbar from './components/MetricsNavbar';


import Footer from './components/Footer';
import Navbar from './components/Navbar';
import Script from 'next/script';


const EthereumdashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      <MetricsNavbar />
      {children}
      <Analytics mode="production" />
      <Script
        id="umami-analytics-scripts"
        src={process.env.UMAMI_URL}
        data-website-id={process.env.UMAMI_DATA_WEBSITE_ID}
      ></Script>
      <Footer />
    </>
  );
};

export default EthereumdashboardLayout;
