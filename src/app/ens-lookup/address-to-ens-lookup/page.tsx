import AddressToENSForm from '@/components/ethereumdashboard/AddressToENSForm';
import type { Metadata } from "next"

// Custom Metadata for SEO
export const metadata: Metadata = {
  title: "Ethereum Address To ENS Lookup",
  description: "Lookup and analyze an Ethereum address by retrieving its ENS domains"
}

// Address To ENS Lookup Custom Component
export default function AddressToENSLookupPage() {

  // Render the Address To ENS Page Component
  return (
    <div className="min-h-screen bg-gray-800 text-gray-300 py-10 px-4 sm:px-6 lg:px-8 shadow-lg">
      <h1 className="text-5xl font-bold mb-6 text-center">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-400 to-gray-100">
          Address To ENS Conversion
        </span>
      </h1>
      <p className="text-xl text-gray-400 mb-12 text-center">
        Detailed ENS information by looking up a wallet address
      </p>
      <AddressToENSForm />
    </div>
  )
}