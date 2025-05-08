import InternalTransactionsActivityTable from '@/app/ethereumdashboard/components/InternalTransactionsActivityTable';
import OpenseaAccountInfoTable from '@/app/ethereumdashboard/components/OpenseaAccountInfoTable';
import TransactionActivityTable from '@/app/ethereumdashboard/components/TransactionActivityTable';
import TransactionsAccountInfoTable from '@/app/ethereumdashboard/components/TransactionsAccountInfoTable';
import addressValidator from '@/app/ethereumdashboard/utils/functions/addressValidator';
import type { Metadata } from 'next';

// Custom Metadata for SEO
export const metadata: Metadata = {
  title: 'Ethereum Wallet Activity',
  description: 'Analyze Ethereum wallets and evaluate wallet activity',
};

// Custom Transactions Page Component
export default async function WalletActivityPage({
  params,
}: {
  params: Promise<{ walletAddress: string }>;
}) {
  const address = (await params).walletAddress;

  // Dynamically render this page based on wallet address validity
  if (!addressValidator(address.trim())) {
    throw new Error();
  } else {
    return (
      <>
        <div className="bg-gray-800 px-4 py-10 text-gray-300 shadow-lg sm:px-6 lg:px-8">
          <h1 className="mb-6 text-center text-5xl font-bold">
            <span className="bg-gradient-to-r from-gray-400 to-gray-100 bg-clip-text text-transparent">
              Wallet Transaction Activity
            </span>
          </h1>
          <p className="mb-12 text-center text-xl text-gray-400">
            Get detailed activity of a particular wallet
          </p>
          <TransactionsAccountInfoTable address={address.trim()} />
          <OpenseaAccountInfoTable address={address.trim()} />
          <TransactionActivityTable address={address.trim()} />
          <InternalTransactionsActivityTable address={address.trim()} />
        </div>
      </>
    );
  }
}
