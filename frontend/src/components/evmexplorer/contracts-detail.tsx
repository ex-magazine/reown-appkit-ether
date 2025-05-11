'use client';

import { getNetworkId } from '@evmexplorer/utility';

import { usePathname } from 'next/navigation';
import { BalanceCard } from '@/components/evmexplorer/BalanceCard';
import { Loading } from '@/components/evmexplorer/Loading';
import { PageSEO } from '@/components/evmexplorer/SEO';
import { TransactionCard } from '@/components/evmexplorer/TransactionCard';
import { useAddressInfo } from '@/hooks/evmexplorer/blockscout';

export default function ContractsDetail({ addressId }: { addressId: string }) {
  const pathname = usePathname();

  const parts = pathname.split('/');
  const network = parts[parts.length - 2];
  const page = parts[parts.length - 1];

  const networkQuery: string = String(network);
  const path: string =
    '/evmexplorer/contracts/' + networkQuery + '/' + String(page);
  const chainId: number = getNetworkId(networkQuery) ?? 1;

  const address: string = page as `0x${string}`;

  const { data: addressInfo, isFetched: isFetchedInfo } = useAddressInfo(
    address,
    chainId,
  );

  return (
    <div className="mx-auto w-full space-y-12 text-center">
      {network && page ? <PageSEO path={path} /> : <PageSEO />}

      {!isFetchedInfo && <Loading />}

      {isFetchedInfo && !addressInfo && (
        <div className="pl-4 pr-4 fade-in-1s transition-all outline outline-offset-1 outline-4 hover:outline-2 outline-[#14892e] hover:outline-[#95ed81] mt-2 items-center justify-center min-w-[300px] sm:min-w-[400px] md:min-w-[500px] lg:min-w-[650px] max-w-xs sm:max-w-sm md:max-w-md lg:max-w-xl mx-auto font-semibold rounded-lg bg-gray-50 pb-2 pt-2">
          <h1 className="text-xs sm:text-sm md:text-md lg:text-lg font-semibold text-cyan-800">
            {address}
          </h1>
        </div>
      )}

      {isFetchedInfo && addressInfo && (
        <BalanceCard
          address={address}
          addressInfo={addressInfo}
          chainId={chainId}
        />
      )}

      {addressInfo && (
        <div className="divide-y divide-gray-300 fade-in-text">
          <TransactionCard address={address} chainId={chainId} />
        </div>
      )}
    </div>
  );
}
