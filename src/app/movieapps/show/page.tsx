'use client';

import Banner from '@/components/ether/movieapps/Banner';
import { usePathname } from 'next/navigation';

function Show() {
  const pathname = usePathname();
  return (
    <>
      <Banner type={pathname === '/show' ? 'tv' : 'movie'} />
    </>
  );
}

export default Show;
