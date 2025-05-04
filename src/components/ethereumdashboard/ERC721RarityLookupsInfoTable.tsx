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
import ERC721RarityLookupType from '@/utils/types/ERC721RarityLookupType';
import PostFetcherArgumentsType from '@/utils/types/PostFetcherArgumentsType';

// Custom ERC721 Rarity Lookups Info Table Component
export default function ERC721RarityLookupsInfoTable(props: {
  address: string;
  tokenID: string;
  network: string;
}) {
  const { address, tokenID, network } = props;

  // Make API call upon loading the custom component
  const { data, error, isLoading } = useSWR<{
    information: { data: ERC721RarityLookupType[] };
  }>(
    ['/api/erc721-lookup-rarity-by-id', { address, id: tokenID, network }],
    ([url, body]: [string, PostFetcherArgumentsType]) =>
      PostFetcher(url, { arg: body }),
    { refreshInterval: 100000 }
  );

  // Conditionally render the info table
  if (isLoading) {
    return <div>Loading ERC721 Rarity Lookups Info Table Component</div>;
  } else if (error) {
    throw new Error();
  } else {
    // Render ERC721 Token Rarity Lookup Info Table Component
    return (
      <div className="mt-10 bg-gray-900 p-4 shadow-lg">
        <h2 className="mb-4 text-2xl font-bold text-gray-100">Token Rarity</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-gray-300">Value</TableHead>
              <TableHead className="text-gray-300">Trait Type</TableHead>
              <TableHead className="text-gray-300">Prevalence</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.information?.data?.map((trait, index: number) => (
              <TableRow key={index} className="border-b border-gray-800">
                <TableCell className="text-gray-300">{trait.value}</TableCell>
                <TableCell className="text-gray-300">
                  {trait.trait_type}
                </TableCell>
                <TableCell className="text-gray-300">
                  {(Number(trait.prevalence) * 100).toFixed(2) + '%'}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }
}
