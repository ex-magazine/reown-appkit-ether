import React from "react"
import Link from "next/link"
import { Person } from "@/tmdb/models"

import { MediaCard } from "@/components/ether/oktaycolakoglu/media-card"
import { MediaPoster } from "@/components/ether/oktaycolakoglu/media-poster"

export const PersonCard: React.FC<Person> = ({
  id,
  name,
  profile_path,
  known_for_department,
}) => {
  return (
    <Link href={`/oktaycolakoglu/person/${id}`} key={id} className="w-full" prefetch={false}>
      <MediaCard.Root>
        <MediaPoster image={profile_path} alt={name} />
        <MediaCard.Content>
          <MediaCard.Title className="mt-2">{name}</MediaCard.Title>

          <MediaCard.Excerpt>
            Known for {known_for_department}
          </MediaCard.Excerpt>
        </MediaCard.Content>
      </MediaCard.Root>
    </Link>
  )
}
