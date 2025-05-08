'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import Link from 'next/link';
import { useState, useRef, useEffect, memo, useCallback } from 'react';
import { Skeleton } from './skeleton';
import { usePathname, useRouter } from 'next/navigation';
import { BookmarkPlus, Clapperboard, ChevronDown } from 'lucide-react';
import useIsMobile from '@/hooks/useIsMobile';
import { TitleText } from './../TitleText';

const MemoizedBookmarkIcon = memo(BookmarkPlus);

export const Navbar = () => {
  const [menuState, setMenuState] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const isMobile = useIsMobile();
  const timeoutRef = useRef<NodeJS.Timeout>();

  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMouseLeave = useCallback(() => {
    timeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 150);
  }, []);

  const handleMouseEnter = (title: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setActiveDropdown(title);
  };

  const handleCloseMenu = () => {
    setMenuState(false);
    setActiveDropdown(null);
  };

  const navigation = [
    { title: 'Home', path: '/movieapps' },
    { title: 'TV/Show', path: '/movieapps/tv' },
    {
      title: 'Movies',
      children: [
        { title: 'Trending', path: '/movieapps/trending' },
        { title: 'Genres', path: '/movieapps/genre' },
        { title: 'Upcoming', path: '/movieapps/upcoming' },
        { title: 'Filter', path: '/movieapps/filter' },
      ],
    },
    { title: 'Cast', path: '/movieapps/person' },
    { title: 'Search', path: '/movieapps/search' },
    { title: 'Contact', path: '/movieapps/contact' },
  ];

  const parts = pathname.split('/');
  const match = parts[parts.length - 3];
  return (
    <>
      {[
        '/main',
        '/main/bookmarks',
        '/main/notifications',
        '/moviesprix/home',
        '/moviesprix/search',
        '/moviesprix/movies',
        '/moviesprix/favorites',
        '/moviestmdb',
        // '/movieapps',
        '/moviestmdb/movies',
        '/moviestmdb/search',
        '/moviestmdb/watchlist',
        '/main/messages',
      ].includes(pathname) ||
      match === 'moviesprix' ||
      match === 'main' ||
      match === 'moviestmdb' ? (
        ''
      ) : (
        <nav
          className={`bg-slate-900 tracking-tight text-gray-100 antialiased ${
            pathname === '/movieapps/search' || pathname.endsWith('/watch')
              ? 'relative'
              : 'relative'
            // : 'fixed'
          } left-0 right-0 z-[100] ${
            isScrolled ? 'bg-slate-900/95 shadow-xl backdrop-blur-sm' : 'mt-1'
            // : "bg-transparent bg-opacity-50"
          } ${
            ['/login', '/register'].includes(pathname) ||
            pathname.startsWith('/dashboard')
              ? 'hidden'
              : 'block'
          } transition-all duration-300`}
        >
          <div className="mx-auto flex max-w-screen-xl items-center space-x-8 px-4 py-3 md:px-8">
            <div className="flex flex-1 items-center justify-between">
              <Link href={'/'} className="flex items-center gap-2">
                <Clapperboard className="h-8 w-8 text-purple-400" />
                <TitleText />
              </Link>
              <div
                className={`absolute left-0 top-16 z-20 w-full border-b bg-slate-900/95 p-4 transition-all duration-300 ease-in-out lg:static lg:block lg:border-none lg:bg-inherit ${
                  isMobile ? 'text-end' : 'unset'
                } ${
                  menuState
                    ? 'translate-y-0 opacity-100'
                    : 'pointer-events-none -translate-y-4 opacity-0 lg:pointer-events-auto lg:translate-y-0 lg:opacity-100'
                }`}
              >
                <ul className="items-center space-y-5 lg:mt-0 lg:flex lg:space-x-6 lg:space-y-0">
                  {navigation.map((item, idx) => (
                    <li key={idx} className="text-gray-400 hover:text-gray-100">
                      {item.children ? (
                        <div
                          className="relative flex flex-col items-end"
                          onMouseEnter={
                            !isMobile
                              ? () => handleMouseEnter(item.title)
                              : undefined
                          }
                          onMouseLeave={
                            !isMobile ? handleMouseLeave : undefined
                          }
                        >
                          <button
                            onClick={() => {
                              if (isMobile) {
                                setActiveDropdown(
                                  activeDropdown === item.title
                                    ? null
                                    : item.title,
                                );
                              }
                            }}
                            className="group flex items-center gap-1"
                          >
                            {item.title}
                            <ChevronDown
                              className={`h-4 w-4 transition-transform duration-300 ${
                                activeDropdown === item.title
                                  ? 'rotate-180'
                                  : ''
                              }`}
                            />
                          </button>

                          {/* Dropdown Content */}
                          {isMobile ? (
                            <div
                              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                                activeDropdown === item.title
                                  ? 'max-h-[500px] opacity-100'
                                  : 'max-h-0 opacity-0'
                              } `}
                            >
                              <ul className="mt-2 space-y-3 pl-4">
                                {item.children.map((child, childIdx) => (
                                  <li
                                    key={childIdx}
                                    className={`transform transition-all duration-300 ease-in-out ${
                                      activeDropdown === item.title
                                        ? 'translate-x-0 opacity-100'
                                        : 'translate-x-4 opacity-0'
                                    } `}
                                    style={{
                                      transitionDelay: `${childIdx * 100}ms`,
                                    }}
                                  >
                                    <Link
                                      href={child.path}
                                      onClick={() => {
                                        setMenuState(false);
                                        setActiveDropdown(null);
                                      }}
                                      className="block py-1 text-gray-400 hover:text-gray-100"
                                    >
                                      {child.title}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ) : (
                            // Desktop Dropdown Content
                            <div
                              className={`absolute left-1/2 top-full -translate-x-1/2 pt-4 transition-all duration-300 ease-in-out ${
                                activeDropdown === item.title
                                  ? 'translate-y-0 opacity-100'
                                  : 'pointer-events-none -translate-y-2 opacity-0'
                              } `}
                            >
                              <ul className="min-w-[160px] space-y-1 rounded-lg border border-slate-700/50 bg-slate-900/95 p-2 shadow-xl backdrop-blur-sm">
                                {item.children.map((child, childIdx) => (
                                  <li key={childIdx}>
                                    <Link
                                      href={child.path}
                                      onClick={() => {
                                        setMenuState(false);
                                        setActiveDropdown(null);
                                      }}
                                      className="block whitespace-nowrap rounded-md px-3 py-2 text-gray-400 transition-colors duration-200 hover:bg-slate-800/80 hover:text-gray-100"
                                    >
                                      {child.title}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      ) : (
                        <Link
                          href={item.path}
                          onClick={handleCloseMenu}
                          className="block py-1 text-gray-400 hover:text-gray-100"
                        >
                          {item.title}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex flex-1 items-center justify-end space-x-2 sm:space-x-6">
                <Link href={'/movieapps/watch-list'} prefetch={false}>
                  <MemoizedBookmarkIcon className="h-6 w-6 text-gray-400" />
                </Link>

                <button
                  className="block text-gray-400 outline-none lg:hidden"
                  onClick={() => setMenuState(!menuState)}
                >
                  {menuState ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 6h16M4 12h16m-7 6h7"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>
        </nav>
      )}
    </>
  );
};
