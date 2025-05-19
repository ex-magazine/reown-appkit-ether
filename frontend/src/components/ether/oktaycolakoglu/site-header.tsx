
import { Suspense } from "react"
import { cookies } from "next/headers";

import { Skeleton } from "@/components/ether/oktaycolakoglu/ui/skeleton"
import { SearchInput } from "@/components/ether/oktaycolakoglu/search-input"
import { SiteMenu } from "@/components/ether/oktaycolakoglu/site-menu"
import { SiteNav } from "@/components/ether/oktaycolakoglu/site-nav"
import { SiteSettings } from "@/components/ether/oktaycolakoglu/site-settings"


export const SiteHeader = async () => {
// export const SiteHeader = () => {
  const cookieStore = await cookies();
  const region = cookieStore.get("region")?.value ?? "US"

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-14 items-center space-x-4 sm:justify-between sm:space-x-0">
        <SiteNav />

        <div className="flex flex-1 justify-end gap-2">
          <Suspense fallback={<Skeleton className="h-10 w-60" />}>
            <SearchInput />
          </Suspense>

          <SiteSettings region={region} />

          <div className="lg:hidden">
            <SiteMenu />
          </div>
        </div>
      </div>
    </header>
  )
}
