import { tmdb } from "@/tmdb/api"
import { WithCombinedCredits, WithImages } from "@/tmdb/api/types"
import { format } from "@/tmdb/utils"

import {
  filterByDepartment,
  formatValue,
  getDepartments,
  getPersonHighlights,
} from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ether/oktaycolakoglu/ui/tabs"
import { MediaBackdrop } from "@/components/ether/oktaycolakoglu/media-backdrop"
import { MediaDetailView } from "@/components/ether/oktaycolakoglu/media-detail-view"
import { MediaImages } from "@/components/ether/oktaycolakoglu/media-images"
import { MediaPoster } from "@/components/ether/oktaycolakoglu/media-poster"
import { MovieCard } from "@/components/ether/oktaycolakoglu/movie-card"
import { PersonCreditsTable } from "@/components/ether/oktaycolakoglu/person-credits-table"
import { TvCard } from "@/components/ether/oktaycolakoglu/tv-card"

interface DetailProps {
  params: {
    id: string
  }
}

// export async function generateMetadata({ params }: DetailProps) {
//   const { name } = await tmdb.person.detail({
//     id: params.id,
//   })

//   return {
//     title: name,
//   }
// }

export default async function Detail({ params }: DetailProps) {
  const id = (await params).id;
  const {
    name,
    profile_path,
    biography,
    birthday,
    place_of_birth,
    images: { profiles },
    known_for_department: department,
    combined_credits: { cast, crew },
  } = await tmdb.person.detail<WithCombinedCredits & WithImages>({
    id: id,
    append: "combined_credits,images",
  })

  const { highlights, hero } = getPersonHighlights({
    cast,
    crew,
    department,
  })

  const info = [birthday && format.date(birthday), place_of_birth]
    .filter(Boolean)
    .join(" — ")

  return (
    <MediaDetailView.Root>
      <MediaDetailView.Backdrop>
        <MediaBackdrop image={hero?.backdrop_path} alt={name} priority />

        {hero?.backdrop_path && (
          <Badge
            variant="secondary"
            className="absolute right-4 top-4 select-none"
          >
            An image from {hero.media_type === "tv" ? hero.name : hero.title},
            one of the productions that also features {name}.
          </Badge>
        )}
      </MediaDetailView.Backdrop>

      <MediaDetailView.Hero>
        <MediaDetailView.Poster>
          <MediaPoster image={profile_path} alt={name} size="w780" priority />
        </MediaDetailView.Poster>

        <div className="space-y-4">
          <MediaDetailView.Title>{name}</MediaDetailView.Title>
          <MediaDetailView.Overview>{info}</MediaDetailView.Overview>
          <MediaDetailView.Overview
            dangerouslySetInnerHTML={{
              __html: formatValue(biography, format.content),
            }}
          />
        </div>
      </MediaDetailView.Hero>

      <MediaDetailView.Content>
        <Tabs defaultValue="known">
          <TabsList className="mb-4">
            <TabsTrigger value="known">Known for</TabsTrigger>
            <TabsTrigger value="credits">Credits</TabsTrigger>
            <TabsTrigger value="images">Images</TabsTrigger>
          </TabsList>

          <TabsContent value="known">
            {highlights.length > 0 ? (
              <div className="grid-list">
                {highlights?.map((item) =>
                  item.media_type === "movie" ? (
                    <MovieCard key={item.id} {...item} />
                  ) : (
                    <TvCard key={item.id} {...item} />
                  )
                )}
              </div>
            ) : (
              <div className="empty-box">No credits</div>
            )}
          </TabsContent>

          <TabsContent value="credits">
            <div className="space-y-8">
              {department === "Acting" && (
                <PersonCreditsTable department="Acting" credits={cast} />
              )}

              {getDepartments(crew).map((department) => (
                <PersonCreditsTable
                  key={department}
                  department={department}
                  credits={filterByDepartment(crew, department)}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="images">
            <MediaImages profiles={profiles} />
          </TabsContent>
        </Tabs>
      </MediaDetailView.Content>
    </MediaDetailView.Root>
  )
}
