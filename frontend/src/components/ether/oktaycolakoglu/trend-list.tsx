import { notFound } from "next/navigation"
import { tmdb } from "@/tmdb/api"

import { ListPagination } from "@/components/ether/oktaycolakoglu/list-pagination"
import { MovieCard } from "@/components/ether/oktaycolakoglu/movie-card"
import { PersonCard } from "@/components/ether/oktaycolakoglu/person-card"
import { TvCard } from "@/components/ether/oktaycolakoglu/tv-card"

interface TrendListProps {
  type: "movie" | "tv" | "people"
  time: "day" | "week"
  page: string
  title?: string
  description?: string
}

export const TrendList: React.FC<TrendListProps> = async ({
  type,
  time,
  page,
  title,
  description,
}) => {
  const {
    results: trends,
    total_pages: totalPages,
    page: currentPage,
  } = await tmdb.trending[type]({
    time,
    page,
  })

  if (!trends?.length) {
    return notFound()
  }

  return (
    <div className="container space-y-8">
      <div className="md:mb-12 md:mt-6">
        <h1 className="mb-2 text-2xl font-medium">{title}</h1>
        <p className="max-w-3xl text-muted-foreground">{description}</p>
      </div>

      <div className="grid-list">
        {trends.map((item) =>
          item.media_type === "tv" ? (
            <TvCard key={item.id} {...item} />
          ) : item.media_type === "person" ? (
            <PersonCard key={item.id} {...item} />
          ) : (
            <MovieCard key={item.id} {...item} />
          )
        )}
      </div>

      <ListPagination currentPage={currentPage} totalPages={totalPages} />
    </div>
  )
}
