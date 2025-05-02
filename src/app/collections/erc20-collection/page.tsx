import ERC20CollectionsAnalyticsForm from "@/components/ethereumdashboard/ERC20CollectionsAnalyticsForm";
import type { Metadata } from "next"

// Custom Metadata for SEO
export const metadata: Metadata = {
  title: "Ethereum ERC20 Collection Analytics",
  description: "Lookup and analyze an Ethereum ERC20 collection"
}

// ERC20 Collection Analytics Page
export default function ERC20CollectionAnalyticsPage() {

  // Render the ERC20 Collection Analytics Page
  return (
    <div className="min-h-screen bg-gray-800 text-gray-300 py-10 px-4 sm:px-6 lg:px-8 shadow-lg">
      <h1 className="text-5xl font-bold mb-6 text-center">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-400 to-gray-100">
          ERC20 Collection Analytics
        </span>
      </h1>
      <p className="text-xl text-gray-400 mb-12 text-center">
        Dive deep into collection metrics
      </p>
      <ERC20CollectionsAnalyticsForm />
    </div>
  )
}