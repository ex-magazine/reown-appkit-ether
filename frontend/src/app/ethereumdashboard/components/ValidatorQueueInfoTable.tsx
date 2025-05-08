'use client';

import useSWR from 'swr';
import GenericFetcher from '@/app/ethereumdashboard/utils/functions/GenericFetcher';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../components/ui/table';
import ValidatorQueueType from '../utils/types/ValidatorQueueType';

// Validator Queue Info Table Component
export default function ValidatorQueueInfoTable() {
  const validatorQueueData = useSWR<{
    information: { data: ValidatorQueueType };
  }>('/api/ethereumdashboard/validator-queue-data', GenericFetcher, { refreshInterval: 50000 });
  const { data: validatorData, error, isLoading } = validatorQueueData;

  // Conditionally render the Validator Queue Info Table Component
  if (error) {
    throw new Error();
  } else if (isLoading) {
    return <div>Loading data...</div>;
  } else {
    // Render the Validator Queue Info Table Component
    return (
      <div className="mb-10 mt-5 bg-gray-900 p-4 shadow-lg">
        <h2 className="mb-4 text-2xl font-bold text-gray-100">
          Validator Queue Statistics
        </h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-gray-300">
                Beaconchain Entering
              </TableHead>
              <TableHead className="text-gray-300">
                Beaconchain Exiting
              </TableHead>
              <TableHead className="text-gray-300">Validators Count</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow key={1} className="border-b border-gray-800">
              <TableCell className="font-medium text-gray-100">
                {validatorData?.information?.data?.beaconchain_entering}
              </TableCell>
              <TableCell className="text-gray-300">
                {validatorData?.information?.data.beaconchain_exiting}
              </TableCell>
              <TableCell className="font-medium text-gray-100">
                {validatorData?.information?.data.validatorscount}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    );
  }
}
