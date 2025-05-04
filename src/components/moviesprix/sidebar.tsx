'use client';
import Link from 'next/link';
import NavLinks from '../../config/nav-link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/moviesprix/utils';
import { Button } from './ui/button';
import { Github } from 'lucide-react';

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <div className="flex h-screen w-72 flex-col border-r bg-card max-md:hidden">
      <div className="border-b p-2 px-6">
        <h2 className="text-center font-semibold">
          <span className="text-gradient text-xl">CrowdFunding</span>
        </h2>
      </div>

      <div className="mt-4 flex flex-1 flex-col gap-3 p-4">
        {NavLinks.map((link) => (
          <Link
            href={link.href}
            key={link.name}
            className={cn(
              'flex items-center gap-2 rounded-full px-5 py-2 text-muted-foreground transition',
              'hover:bg-muted/75',
              pathname.startsWith(link.href) &&
                'bg-secondary text-primary hover:bg-secondary',
            )}
          >
            <link.icons className="size-4" />
            <span>{link.name}</span>
          </Link>
        ))}

        <a
          href="https://github.com/ex-magazine/reown-appkit-ether"
          target="_blank"
          className="mt-auto"
        >
          <Button variant={'secondary'} className="w-full">
            <Github />
            View Source
          </Button>
        </a>
      </div>
    </div>
  );
};

export default Sidebar;
