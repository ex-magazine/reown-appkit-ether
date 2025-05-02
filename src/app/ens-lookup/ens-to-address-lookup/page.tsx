import ENSToAddressForm from '@/components/ethereumdashboard/ENSToAddressForm';
import type { Metadata } from "next"

// Custom Metadata for SEO
export const metadata: Metadata = {
  title: "Ethereum ENS To Address Lookup",
  description: "Lookup and analyze an ENS domain by retrieving its Ethereum address"
}

// ENS To Address Lookup Page Custom Component
export default function ENSToAddressLookupPage() {

  // Render the ENS To Address Page Component
  return (
    <div className="min-h-screen bg-gray-800 text-gray-300 py-10 px-4 sm:px-6 lg:px-8 shadow-lg">
      <h1 className="text-5xl font-bold mb-6 text-center">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-400 to-gray-100">
          ENS To Address Conversion
        </span>
      </h1>
      <p className="text-xl text-gray-400 mb-12 text-center">
        Detailed wallet information by looking up an ENS domain
      </p>
      <ENSToAddressForm />
    </div>
  )
}