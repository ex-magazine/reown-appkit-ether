'use client';
import Link from 'next/link';
import { Ticket } from 'lucide-react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

export default function Logo() {
  const pathname = usePathname();
  const isHomePage = pathname === '/';
  return (
    <div
      className={cn('flex items-center gap-2 font-bold', {
        'md:hidden': !isHomePage,
      })}
    >
      <Link
        href={isHomePage ? '/' : '/dashboard'}
        className="flex items-center gap-2 hover:opacity-75"
      >
        <Ticket className="h-10 w-10 dark:text-white text-black" />
        <span className="font-mono text-xl tracking-tight dark:text-white text-black">
          <Image
            src="/reown-logo.png"
            alt="Reown"
            width={150}
            height={70}
            priority
          />
        </span>
      </Link>
    </div>
  );
}
