import { Loader2Icon } from 'lucide-react';

const Loader = () => {
  return (
    <div className="flex h-[98dvh] flex-1 flex-col items-center justify-center gap-2 text-center md:gap-4">
      <Loader2Icon className="size-10 animate-spin text-primary md:size-14" />

      <p className="text-gradient text-lg font-semibold uppercase tracking-wider md:text-xl">
        Loading
      </p>
    </div>
  );
};

export default Loader;
