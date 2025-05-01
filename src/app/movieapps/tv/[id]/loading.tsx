function loading() {
  return (
    <div className="min-h-screen animate-pulse bg-slate-900">
      <div className="relative h-[31rem] bg-slate-700 md:h-[35rem] lg:h-[45rem]"></div>

      <div className="container relative z-10 mx-auto px-4 sm:-mt-[14rem] md:-mt-[16rem] lg:-mt-[26rem]">
        <div className="flex flex-col gap-8 md:flex-row">
          {/* Poster Skeleton */}
          <div className="w-auto">
            <div className="md:[22rem] relative overflow-hidden rounded-xl bg-slate-700 sm:h-[18rem] sm:w-[12rem] md:w-[16rem] lg:h-[30rem] lg:w-[20rem]"></div>
          </div>

          {/* Details Skeleton */}
          <div className="w-full text-white md:w-2/3">
            <div className="mb-4 h-10 w-3/4 rounded bg-slate-700"></div>

            <div className="mb-6 flex items-center gap-4">
              <div className="h-6 w-20 rounded bg-slate-700"></div>
              <div className="h-6 w-28 rounded bg-slate-700"></div>
              <div className="h-6 w-16 rounded bg-slate-700"></div>
            </div>

            <div className="mb-6 flex flex-wrap gap-4">
              <div className="h-8 w-20 rounded-full bg-cyan-700"></div>
              <div className="h-8 w-24 rounded-full bg-cyan-700"></div>
              <div className="w-18 h-8 rounded-full bg-cyan-700"></div>
            </div>

            <div className="mb-8 h-24 rounded bg-slate-700"></div>

            <div className="h-12 w-40 rounded bg-slate-700"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default loading;
