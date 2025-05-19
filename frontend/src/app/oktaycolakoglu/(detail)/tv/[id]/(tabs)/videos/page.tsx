import { tmdb } from "@/tmdb/api"

import { MediaVideos } from "@/components/ether/oktaycolakoglu/media-videos"

interface VideosProps {
  params: {
    id: string
  }
}

export const metadata = {
  title: "Videos",
}

export default async function DetailVideos({ params }: VideosProps) {
  const { results: videos } = await tmdb.tv.videos({
    id: params.id,
  })

  return <MediaVideos videos={videos} />
}
