'use client';

import useSWR from 'swr';
import PostFetcher from '@/utils/functions/PostFetcher';
import {
  Table,
  TableCell,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';
import ERC721CollectionTransfersInfoType from '@/utils/types/ERC721CollectionTransfersInfoType';
import PostFetcherArgumentsType from '@/utils/types/PostFetcherArgumentsType';

// ERC721 Collection Transfers Info Table Custom Component
export default function ERC721CollectionTransfersInfoTable(props: {
  address: string;
}) {
  const { address } = props;
  const { data, error, isLoading } = useSWR(
    ['/api/erc721-collection-transfers', { address }],
    ([url, body]: [string, PostFetcherArgumentsType]) =>
      PostFetcher(url, { arg: body }),
    { refreshInterval: 100000 }
  );

  // Conditionally render component
  if (isLoading) {
    return <div>Loading ERC721 Collection Transfers Info Table...</div>;
  } else if (error) {
    throw new Error();
  } else {
    const erc721CollectionTransfersData: ERC721CollectionTransfersInfoType[] =
      data.information.result;

    // Render the ERC721 Collection Transfers Info Table Component
    return (
      <div className="mt-10 bg-gray-900 p-4 shadow-lg">
        <h2 className="mb-4 text-2xl font-bold text-gray-100">
          Transfers Activity
        </h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-gray-300">Date</TableHead>
              <TableHead className="text-gray-300">Token ID</TableHead>
              <TableHead className="text-gray-300">Buyer</TableHead>
              <TableHead className="text-gray-300">Seller</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {erc721CollectionTransfersData?.map((transfer, index: number) => {
              return (
                <TableRow key={index} className="border-b border-gray-800">
                  <TableCell className="text-gray-300">
                    {transfer.block_timestamp.split('.')[0]}
                  </TableCell>
                  <TableCell className="text-gray-300">
                    {transfer.token_id}
                  </TableCell>
                  <TableCell className="text-gray-300">
                    {transfer.from_address}
                  </TableCell>
                  <TableCell className="text-gray-300">
                    {transfer.to_address}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    );
  }
}
