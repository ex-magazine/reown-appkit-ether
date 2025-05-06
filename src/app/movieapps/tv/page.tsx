'use client';

import Banner from '@/components/ether/movieapps/Banner';
import { usePathname } from 'next/navigation';

function Tv() {
  const pathname = usePathname();
  return (
    <>
      <Banner type={pathname === '/tv' ? 'tv' : 'movie'} />
    </>
  );
}

export default Tv;
