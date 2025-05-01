import { BottomNav } from '@/components/moviesprix/bottom-nav';
import Sidebar from '@/components/moviesprix/sidebar';
import { ScrollArea } from '@/components/moviesprix/ui/scroll-area';
import { FavoritesProvider } from '@/context/favorites-context';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <FavoritesProvider>
      <div className="flex h-dvh flex-col overflow-hidden md:flex-row">
        <Sidebar />
        <main className="relative flex-1 max-md:h-[calc(100dvh-4rem)]">
          <ScrollArea className="h-full">
            <div className="mx-auto max-w-screen-xl px-2 py-3 !pb-16 md:px-5 md:py-4">
              {children}
            </div>
          </ScrollArea>
        </main>
        <BottomNav />
      </div>
    </FavoritesProvider>
  );
};

export default DashboardLayout;
