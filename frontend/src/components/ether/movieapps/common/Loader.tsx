export const Loader = () => {
  return (
    <div className="flex min-h-[300px] flex-col items-center justify-center gap-4">
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-cyan-500 border-t-transparent"></div>
      <span className="text-slate-400">Loading movies...</span>
    </div>
  );
};
