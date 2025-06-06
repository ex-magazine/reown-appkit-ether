import { Metadata } from "next"
import { tmdb } from "@/tmdb/api"

import { MovieHero } from "@/components/ether/oktaycolakoglu/movie-hero"
import { TrendCarousel } from "@/components/ether/oktaycolakoglu/trend-carousel"
import { TvHero } from "@/components/ether/oktaycolakoglu/tv-hero"

export const metadata: Metadata = {
  title: "Home",
}

export default async function Home() {
  const { results: movies } = await tmdb.trending.movie({
    time: "day",
    page: "1",
  })

  const { results: tvShows } = await tmdb.trending.tv({
    time: "day",
    page: "1",
  })

 
  return (
    <section>
      <div className="container space-y-8 mx-auto">
        <MovieHero movies={movies} label="Trending Now" priority />

        <TrendCarousel
          type="movie"
          title="Trending Movies"
          link="/oktaycolakoglu/trending/movie"
          items={movies}
        />

        <div className="grid gap-4 md:grid-cols-2">
          <MovieHero
            movies={movies.slice(0, 10)}
            label="Trending Now"
            count={2}
          />
          <TvHero
            tvShows={tvShows.slice(0, 10)}
            label="Trending Now"
            count={2}
          />
        </div>

        <TrendCarousel
          type="tv"
          title="Trending TV Shows"
          link="/oktaycolakoglu/trending/tv"
          items={tvShows}
        />

        <div className="grid gap-4 md:grid-cols-2">
          <MovieHero
            movies={movies.slice(10, 10)}
            label="Trending Now"
            count={2}
          />
          <TvHero
            tvShows={tvShows.slice(10, 10)}
            label="Trending Now"
            count={2}
          />
        </div>
      </div>
    </section>
  )
}
