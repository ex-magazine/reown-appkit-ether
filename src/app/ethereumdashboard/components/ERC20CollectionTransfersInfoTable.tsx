'use client';

import useSWR from 'swr';
import PostFetcher from '../utils/functions/PostFetcher';
import {
  Table,
  TableCell,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';
import ERC20CollectionTransfersType from '../utils/types/ERC20CollectionTransfersType';
import PostFetcherArgumentsType from '../utils/types/PostFetcherArgumentsType';

// Custom ERC20 Collection Transfers Info Table Component
export default function ERC20collectionOwnersInfoTable(props: {
  address: string;
}) {
  const { address } = props;

  // Make API call upon loading the custom component
  const { data, error, isLoading } = useSWR<{
    result: ERC20CollectionTransfersType[];
  }>(
    ['/api/erc20-transfer', { contract: address }],
    ([url, body]: [string, PostFetcherArgumentsType]) =>
      PostFetcher(url, { arg: body }),
    { refreshInterval: 100000 }
  );

  // Conditionally render the info table
  if (isLoading) {
    return <div>Loading ERC20 Collection Transfers Info Table Component</div>;
  } else if (error) {
    throw new Error();
  } else {
    // Render ERC20 Collection Transfers Info Table Component
    return (
      <div className="mt-10 bg-gray-900 p-4 shadow-lg">
        <h2 className="mb-4 text-2xl font-bold text-gray-100">
          Collection Transfers
        </h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-gray-300">Date</TableHead>
              <TableHead className="text-gray-300">From</TableHead>
              <TableHead className="text-gray-300">To</TableHead>
              <TableHead className="text-gray-300">Value</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.result?.map((transfer, index: number) => (
              <TableRow key={index} className="border-b border-gray-800">
                <TableCell className="text-gray-300">
                  {String(transfer.block_timestamp).split('.')[0]}
                </TableCell>
                <TableCell className="text-gray-300">
                  {transfer.from_address}
                </TableCell>
                <TableCell className="text-gray-300">
                  {transfer.to_address}
                </TableCell>
                <TableCell className="text-gray-300">
                  {transfer.value_decimal}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }
}
