'use client';

import useSWR from 'swr';
import ERC20TokenInformationType from '@/utils/types/ERC20TokenInformationType';
import PostFetcher from '@/utils/functions/PostFetcher';
import { Card, CardHeader, CardTitle, CardDescription } from './ui/card';
import Image from 'next/image';
import EtherscanInfoTable from './EtherscanInfoTable';
import ERC20TokenPricesInfoTable from './ERC20TokenPricesInfoTable';
import ERC20PriceChartComponent from './ERC20PriceChartComponent';
import PostFetcherArgumentsType from '@/utils/types/PostFetcherArgumentsType';

// ERC20 Token Information Section Custom Component
export default function ERC20TokenInformationSection(props: {
  address: string;
}) {
  const { address } = props;
  const { data, error, isLoading } = useSWR(
    ['/api/ERC20-coin-information', { contract: address }],
    ([url, body]: [string, PostFetcherArgumentsType]) =>
      PostFetcher(url, { arg: body }),
    { refreshInterval: 100000 }
  );

  // Conditionally render component
  if (isLoading) {
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
        }}
      >
        Loading ERC20 Token Information Section Component...
      </div>
    );
  } else if (error) {
    throw new Error();
  } else {
    const erc20TokenInformation: ERC20TokenInformationType = data.information;

    // Render ERC20 Token Information Section Component
    return (
      <>
        <Card
          style={{ marginLeft: 'auto', marginRight: 'auto', width: '75%' }}
          className="mt-10 w-full border-gray-800 bg-gray-900 shadow-xl"
        >
          <CardHeader className="border-b border-gray-800 pb-6">
            <CardTitle className="mx-auto text-3xl font-bold text-gray-100">
              {erc20TokenInformation?.name}
            </CardTitle>
            <CardDescription className="mx-auto text-lg font-light text-gray-400">
              <i>{address}</i>
            </CardDescription>
            <Image
              className="mx-auto"
              alt="ERC20_Token_Image.png"
              src={erc20TokenInformation?.image?.thumb}
              width={50}
              height={50}
            />
            <div className="pt-2">
              <CardDescription className="mx-auto text-lg font-light text-gray-400">
                <i>{erc20TokenInformation?.description?.en}</i>
              </CardDescription>
            </div>
          </CardHeader>
        </Card>
        <EtherscanInfoTable address={address} />
        <ERC20TokenPricesInfoTable data={erc20TokenInformation} />
        <ERC20PriceChartComponent
          address={address}
          data={erc20TokenInformation}
        />
      </>
    );
  }
}
