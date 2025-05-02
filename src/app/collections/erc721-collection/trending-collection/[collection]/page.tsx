import ERC721CollectionAttributeSummaryInfoTable from "@/components/ethereumdashboard/ERC721CollectionAttributeSummaryInfoTable";
import ERC721CollectionDataInfoTable from "@/components/ethereumdashboard/ERC721CollectionDataInfoTable";
import ERC721CollectionExtraDataInfoTable from "@/components/ethereumdashboard/ERC721CollectionExtraDataInfoTable";
import ERC721CollectionFloorPriceInfoTable from "@/components/ethereumdashboard/ERC721CollectionFloorPriceInfoTable";
import ERC721CollectionSalesInfoTable from "@/components/ethereumdashboard/ERC721CollectionSalesInfoTable";
import ERC721CollectionTransfersInfoTable from "@/components/ethereumdashboard/ERC721CollectionTransfersInfoTable";
import { collectionValidator } from "@/utils/functions/collectionValidator";
import type { Metadata } from "next"

// Custom Metadata for SEO
export const metadata: Metadata = {
  title: "Ethereum Trending Collection Analytics",
  description: "Lookup and analyze a trending Ethereum ERC721 collection"
}
// Displaying historical price information of a particular coin
export default async function TrendingCollectionsPage({ params }: { params: Promise<{ collection: string }> }) {
  const collectionAddress = (await params).collection

  // Check validity of this coin by running a custom function validating if it exists within the Coin Gecko coin list
  const validateCollection = await collectionValidator(collectionAddress);

  if (validateCollection !== '') {
    // Render the Generic Chart Page componen if the coin ID is valid
    return (
      <div className="min-h-screen bg-gray-800 text-gray-300 py-10 px-4 sm:px-6 lg:px-8 shadow-lg">
        <h4 className="text-5xl font-bold mb-6 text-center">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-400 to-gray-100">
            Trending Collection Data
          </span>
        </h4>
        <p className="text-xl text-gray-400 mb-12 text-center">
          <i>{collectionAddress.toUpperCase()} - {validateCollection.trim()}</i>
        </p>
        <ERC721CollectionDataInfoTable address={validateCollection.trim()} />
        <ERC721CollectionFloorPriceInfoTable address={validateCollection.trim()} />
        <ERC721CollectionExtraDataInfoTable address={validateCollection.trim()} />
        <ERC721CollectionAttributeSummaryInfoTable address={validateCollection.trim()} />
        <ERC721CollectionTransfersInfoTable address={validateCollection.trim()} />
        <ERC721CollectionSalesInfoTable address={validateCollection.trim()} />
      </div>
    )
  }
  else {
    // Collection ID is not valid, therefore return the error page
    throw new Error();
  }
}