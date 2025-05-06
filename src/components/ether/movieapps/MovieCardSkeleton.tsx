import { motion } from 'framer-motion';

const MovieCardSkeleton = () => {
  return (
    <motion.div
      className="group relative overflow-hidden rounded-xl bg-slate-800"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="relative aspect-[2/3] animate-pulse bg-slate-700" />

      <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />

      <div className="absolute bottom-0 left-0 right-0 space-y-3 p-4">
        <div className="h-5 w-3/4 animate-pulse rounded bg-slate-600" />
        <div className="flex items-center justify-between">
          <div className="h-4 w-12 animate-pulse rounded bg-slate-600" />
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="h-4 w-4 animate-pulse rounded-full bg-slate-600"
              />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default MovieCardSkeleton;
