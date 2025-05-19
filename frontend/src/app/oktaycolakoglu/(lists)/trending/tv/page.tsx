import { pages } from "@/config/oktaycolakoglu"

import { TrendList } from "@/components/ether/oktaycolakoglu/trend-list"

interface TrendingPageProps {
  searchParams?: Record<string, string>
}

export async function generateMetadata() {
  return {
    title: "Trending TV Shows",
    description: pages.trending.tv.description,
  }
}

export default async function TrendingPage({
  searchParams,
}: TrendingPageProps) {
  return (
    <TrendList
      type="tv"
      time="day"
      title="Trending TV Shows"
      description={pages.trending.tv.description}
      page={searchParams?.page ?? "1"}
    />
  )
}
