'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../components/ui/table';
import Link from 'next/link';

// Custom Component for viewing account details
export default function ENSToAddressInfoTable(props: {
  data: { name: string; address: string };
}) {
  const { data } = props;

  // Render table containing this key information
  return (
    <div className="mt-10 bg-gray-900 p-4 shadow-lg">
      <h2 className="mb-4 text-2xl font-bold text-gray-100">
        Account Information
      </h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-gray-300">ENS Domain</TableHead>
            <TableHead className="text-gray-300">Address</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow key={data?.name} className="border-b border-gray-800">
            <TableCell className="font-medium text-gray-100">
              <Link target="_blank" href={'https://' + data?.name + '.xyz/'}>
                <u>{'https://' + data?.name + '.xyz/'}</u>
              </Link>
            </TableCell>
            <TableCell className="text-gray-300">{data?.address}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}
