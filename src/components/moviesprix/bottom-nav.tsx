'use client';

import NavLinks from '@/config/nav-link';
import { cn } from '@/lib/moviesprix/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="border-t bg-card md:hidden">
      <div className="flex justify-around py-3">
        {NavLinks.map((link) => (
          <Link
            href={link.href}
            key={link.name}
            className={cn(
              'flex flex-col items-center font-semibold text-muted-foreground',
              pathname.startsWith(link.href) && 'font-bold text-primary'
            )}
          >
            <link.icons className="size-5" />
            <span className="mt-1 text-xs">{link.name}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
}
