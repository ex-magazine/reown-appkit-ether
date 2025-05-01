import { Skeleton } from '@/components/movieapps/ui/skeleton';

export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-900 pb-20">
      <div className="mx-auto max-w-7xl animate-pulse space-y-4 px-4 pt-28">
        {/* Title Skeleton */}
        <Skeleton className="h-6 w-48 rounded-lg bg-gray-800" />

        {/* Server Selector Skeleton */}
        <div className="flex items-center gap-2">
          <Skeleton className="h-5 w-24 rounded-md bg-gray-800" />
          <Skeleton className="h-10 w-32 rounded-md bg-gray-800" />
        </div>

        {/* Season/Episode Selector Skeleton */}
        <div className="space-y-4">
          <Skeleton className="h-12 w-48 rounded-lg bg-gray-800" />

          <div className="flex flex-wrap gap-2">
            {[...Array(6)].map((_, i) => (
              <Skeleton
                key={i}
                className="relative h-10 w-10 rounded-lg bg-gray-800"
              >
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-700">
                  <div className="h-full w-1/2 bg-gray-600" />
                </div>
              </Skeleton>
            ))}
          </div>
        </div>

        {/* Video Player Skeleton */}
        <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-gray-800 shadow-xl">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-16 w-16 animate-spin rounded-full border-4 border-gray-600 border-t-transparent" />
          </div>
        </div>

        {/* Progress Info Skeleton */}
        <div className="flex items-center justify-between">
          <Skeleton className="h-4 w-32 rounded-md bg-gray-800" />
          <Skeleton className="h-4 w-24 rounded-md bg-gray-800" />
        </div>
      </div>
    </div>
  );
}
