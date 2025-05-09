'use client';

import Link from 'next/link';
import { Button } from '../ui/button';
import { useTheme } from 'next-themes';
import { FaHeart } from 'react-icons/fa6';
import { LuMoonStar, LuSun } from 'react-icons/lu';
import SearchForm from '../forms/SearchForm';
import { useMemo } from 'react';

export default function Header() {
  const { theme, setTheme, systemTheme } = useTheme();

  const currentTheme = useMemo(() => {
    if (theme === 'system') {
      return systemTheme;
    }

    return theme;
  }, [theme, systemTheme]);

  return (
    <header className="sticky left-0 top-0 z-[3] mb-4 border-b bg-background">
      <div className="container mx-auto flex items-center justify-between px-4 py-4">
        <Link
          href="/moviestmdb/home"
          className="flex size-10 items-center justify-center rounded-full border-[3px] text-xl font-medium"
        >
          M
        </Link>
        <SearchForm />
        <nav className="flex items-center gap-1 sm:gap-4">
          <Button asChild variant="ghost" className="max-sm:size-10">
            <Link
              href="/moviestmdb/watchlist"
              className="text-sm font-semibold"
            >
              <FaHeart />
              <span className="max-sm:hidden">Wishlist</span>
            </Link>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(currentTheme === 'dark' ? 'light' : 'dark')}
          >
            {currentTheme === 'dark' ? <LuSun /> : <LuMoonStar />}
            <span className="sr-only">Toggle theme</span>
          </Button>
        </nav>
      </div>
    </header>
  );
}
