'use client';

import useSWR from 'swr';
import PostFetcher from '@/utils/functions/PostFetcher';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';
import ENSOwnershipType from '@/utils/types/ENSOwnershipType';
import PostFetcherArgumentsType from '@/utils/types/PostFetcherArgumentsType';

// ENS Ownership Info Table Component
export default function ENSOwnershipInfoTable(props: { data: string }) {
  const { data } = props;
  const {
    data: ensOwnershipData,
    error,
    isLoading,
  } = useSWR<{ results: ENSOwnershipType[] }>(
    ['/api/ens-ownership-information', { address: data }],
    ([url, body]: [string, PostFetcherArgumentsType]) =>
      PostFetcher(url, { arg: body }),
    { refreshInterval: 100000 },
  );

  // Conditionally render ENS Ownership data
  if (isLoading) {
    return <div>Loading ENS Ownership Data...</div>;
  } else if (error) {
    throw new Error();
  } else {
    // Render the ENS Ownership Info Table Component
    return (
      <div className="mt-10 bg-gray-900 p-4 shadow-lg">
        <h2 className="mb-4 text-2xl font-bold text-gray-100">ENS Ownership</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-gray-300">ENS Name</TableHead>
              <TableHead className="text-gray-300">Creation Date</TableHead>
              <TableHead className="text-gray-300">Expiration Date</TableHead>
              <TableHead className="text-gray-300">Grace Period</TableHead>
              <TableHead className="text-gray-300">Premium Period</TableHead>
              <TableHead className="text-gray-300">In Grace</TableHead>
              <TableHead className="text-gray-300">In Period</TableHead>
              <TableHead className="text-gray-300">Expired</TableHead>
              <TableHead className="text-gray-300">Last Refreshed</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {ensOwnershipData?.results?.map((ens) => (
              <TableRow key={ens.ens_name} className="border-b border-gray-800">
                <TableCell className="font-medium text-gray-100">
                  {ens.ens_name}
                </TableCell>
                <TableCell className="font-medium text-gray-100">
                  {ens.registration_timestamp.split('T')[0]}
                </TableCell>
                <TableCell className="font-medium text-gray-100">
                  {ens.expiration_timestamp.split('T')[0]}
                </TableCell>
                <TableCell className="font-medium text-gray-100">
                  {ens.grace_period_ends.split('T')[0]}
                </TableCell>
                <TableCell className="font-medium text-gray-100">
                  {ens.premium_period_ends.split('T')[0]}
                </TableCell>
                <TableCell className="font-medium text-gray-100">
                  {ens.in_grace_period ? 'YES' : 'NO'}
                </TableCell>
                <TableCell className="font-medium text-gray-100">
                  {ens.in_premium_period ? 'YES' : 'NO'}
                </TableCell>
                <TableCell className="font-medium text-gray-100">
                  {ens.is_expired ? 'YES' : 'NO'}
                </TableCell>
                <TableCell className="font-medium text-gray-100">
                  {ens.last_refreshed.split('T')[0]}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }
}
