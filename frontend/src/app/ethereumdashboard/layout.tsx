import { Analytics } from '@vercel/analytics/next';

import MetricsNavbar from '@/components/ether/ethereumdashboard/MetricsNavbar';

import Footer from '@/components/ether/ethereumdashboard/Footer';
import Navbar from '@/components/ether/ethereumdashboard/Navbar';
import Script from 'next/script';

const EthereumdashboardLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <>
      <MetricsNavbar />
      {children}
      <Analytics mode="production" />
      <Script
        id="umami-analytics-scripts"
        src={process.env.UMAMI_URL}
        data-website-id={process.env.UMAMI_DATA_WEBSITE_ID}
      ></Script>
    </>
  );
};

export default EthereumdashboardLayout;
