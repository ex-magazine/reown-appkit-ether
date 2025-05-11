// import type { NextComponentType } from "next";
// import type AppProps from "next/app";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { useMemo } from "react";
import { Footer } from '@/components/evmexplorer/Footer';

const EvmexplorerLayout = ({ children }: { children: React.ReactNode }) => {
  // const queryClient = useMemo(() => {
  //   return new QueryClient({
  //     defaultOptions: {
  //       queries: {
  //         retry: 2,
  //         retryDelay: 100,
  //         staleTime: 60000 * 10,
  //       },
  //     },
  //   });
  // }, []);

  return (
    // <QueryClientProvider client={queryClient}>
    <section className="flex flex-1 flex-col items-center justify-center px-4 pt-20">
      {children}
      <Footer />
    </section>

    // </QueryClientProvider>
  );
};

export default EvmexplorerLayout;
