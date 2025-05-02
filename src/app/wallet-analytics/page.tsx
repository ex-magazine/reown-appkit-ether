import WalletAnalyticsForm from "@/components/ethereumdashboard/WalletAnalyticsForm";
import type { Metadata } from "next"

// Custom Metadata for SEO
export const metadata: Metadata = {
  title: "Ethereum Wallet Analytics",
  description: "Analyze Ethereum wallets and evaluate performance"
}

// Wallet Analytics Custom Component
export default function WalletAnalyticsPage() {

  // Render the Wallet Analytics Page Component
  return (
    <div className="min-h-screen bg-gray-800 text-gray-300 py-10 px-4 sm:px-6 lg:px-8 shadow-lg">
      <h1 className="text-5xl font-bold mb-6 text-center">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-400 to-gray-100">
          Wallet Analytics
        </span>
      </h1>
      <p className="text-xl text-gray-400 mb-12 text-center">
        Dive deep into wallet performance
      </p>
      <WalletAnalyticsForm />
    </div>
  )
}