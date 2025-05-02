import InternalTransactionsActivityTable from "@/components/ethereumdashboard/InternalTransactionsActivityTable";
import OpenseaAccountInfoTable from "@/components/ethereumdashboard/OpenseaAccountInfoTable";
import TransactionActivityTable from "@/components/ethereumdashboard/TransactionActivityTable";
import TransactionsAccountInfoTable from "@/components/ethereumdashboard/TransactionsAccountInfoTable";
import addressValidator from "@/utils/functions/addressValidator";
import type { Metadata } from "next"

// Custom Metadata for SEO
export const metadata: Metadata = {
  title: "Ethereum Wallet Activity",
  description: "Analyze Ethereum wallets and evaluate wallet activity"
}

// Custom Transactions Page Component
export default async function WalletActivityPage({ params }: { params: Promise<{ walletAddress: string }> }) {
  const address = (await params).walletAddress;

  // Dynamically render this page based on wallet address validity
  if (!addressValidator(address.trim())) {
    throw new Error();
  }
  else {
    return (
      <>
        <div className="bg-gray-800 text-gray-300 py-10 px-4 sm:px-6 lg:px-8 shadow-lg">
          <h1 className="text-5xl font-bold mb-6 text-center">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-400 to-gray-100">
              Wallet Transaction Activity
            </span>
          </h1>
          <p className="text-xl text-gray-400 mb-12 text-center">
            Get detailed activity of a particular wallet
          </p>
          <TransactionsAccountInfoTable address={address.trim()} />
          <OpenseaAccountInfoTable address={address.trim()} />
          <TransactionActivityTable address={address.trim()} />
          <InternalTransactionsActivityTable address={address.trim()} />
        </div>
      </>
    )
  }
}