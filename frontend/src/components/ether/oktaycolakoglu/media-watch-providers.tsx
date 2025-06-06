import { cookies } from "next/headers"
import { tmdb } from "@/tmdb/api"
import { WatchLocale } from "@/tmdb/models"

import { getCountryName } from "@/lib/utils"
import { InfoTooltip } from "@/components/ether/oktaycolakoglu/info-tooltip"
import { ProviderTable } from "@/components/ether/oktaycolakoglu/provider-table"

interface MediaWatchProvidersProps {
  id: string
  type: "movie" | "tv"
  season?: number
}

export const MediaWatchProviders: React.FC<MediaWatchProvidersProps> = async ({
  id,
  type,
  season,
}) => {
  const { results } = await tmdb[type].providers({ id, season })
  const cookieStore = await cookies();
  const region = (cookieStore.get("region")?.value ?? "US") as keyof WatchLocale
  const country = getCountryName(region)

  return (
    <div className="space-y-6 rounded-md border bg-background p-6">
      <div>
        <h2 className="flex items-center gap-2 text-lg font-medium">
          Where to Watch
          <InfoTooltip className="w-60">
            Currently showing providers for{" "}
            <span className="underline">{country}</span> You can change your
            preferred region in the settings
          </InfoTooltip>
        </h2>
        <p className="text-muted-foreground">
          Stream, buy or rent this {type === "tv" ? "tv show" : "movie"} from
          the providers below.
        </p>
      </div>

      <div className="space-y-6">
        <div className="grid gap-4 lg:grid-cols-3">
          <ProviderTable
            title="Stream"
            providers={results?.[region]?.flatrate}
          />
          <ProviderTable title="Buy" providers={results?.[region]?.buy} />
          <ProviderTable title="Rent" providers={results?.[region]?.rent} />
        </div>
      </div>
    </div>
  )
}
