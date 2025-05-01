'use client';

import { useState, useRef, useEffect, memo, useCallback } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { BookmarkPlus, Clapperboard, ChevronDown } from 'lucide-react';
import useIsMobile from '@/hooks/useIsMobile';
// import { logoutUser } from "@/action/Auth";
// import { useAuth } from "@/context/AuthContext";
// import { useUserProfile } from "@/hooks/useUserProfile";
import { Skeleton } from '@/components/movieapps/ui/skeleton';

export const ProfileDropDown = ({ props, onCloseMenu }: any) => {
  const [state, setState] = useState(false);
  const isMobile = useIsMobile();
  const router = useRouter();
  const profileRef: any = useRef();
  // const { isAuthenticated, token, handleLogout } = useAuth();
  // const { data, isLoading, error } = useUserProfile({ queryType: "userProfile" });

  useEffect(() => {
    const handleDropDown = (e: any) => {
      if (profileRef.current && !profileRef.current.contains(e.target))
        setState(false);
    };
    document.addEventListener('click', handleDropDown);

    return () => {
      document.removeEventListener('click', handleDropDown);
    };
  }, []);

  const navigation = [
    { title: 'Sign In', path: '/auth/signin' },
    // { title: "Dashboard", path: "/dashboard" },
    // { title: "Settings", path: "/settings" },
    // { title: `${isAuthenticated ? "Log out" : "Log in"}`, path: "/login" },
  ];

  return (
    <div className={`relative ${props}`}>
      <Avatar
        className={`flex items-center space-x-4 ${
          isMobile ? 'flex-row-reverse gap-4' : 'flex-row'
        }`}
      >
        <button
          ref={profileRef}
          className="h-10 w-10 rounded-full outline-none ring-2 ring-gray-200 ring-offset-2 lg:focus:ring-indigo-600"
          onClick={() => setState(!state)}
        >
          <AvatarImage
            alt="profile picture"
            src="https://github.com/shadcn.png"
            width={40}
            height={40}
            className="h-full w-full rounded-full"
          />
          <AvatarFallback>
            <Skeleton />
          </AvatarFallback>
        </button>
        {/* <div className="lg:hidden">
          <span className="block">
            {isAuthenticated ? data?.data?.name : "user"}
          </span>
          <span className="block text-sm text-gray-500">
            {isAuthenticated ? data?.data?.email : "user@example.com"}
          </span>
        </div> */}
      </Avatar>
      {/* Profile Dropdown Content */}
      {isMobile ? (
        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out ${state ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'} `}
        >
          <ul className="static mt-3 w-full space-y-2">
            {navigation.map((item, idx) => (
              <li
                key={idx}
                className={`transform transition-all duration-300 ease-in-out ${
                  state
                    ? 'translate-x-0 opacity-100'
                    : 'translate-x-4 opacity-0'
                } `}
                style={{
                  transitionDelay: `${idx * 100}ms`,
                }}
              >
                {item.title === 'Log out' ? (
                  <button
                    className="block w-full px-4 py-2 text-end text-gray-200 transition-colors duration-200 hover:bg-slate-800/80"
                    onClick={() => {
                      // handleLogout()
                      onCloseMenu();
                    }}
                  >
                    {item.title}
                  </button>
                ) : (
                  <Link
                    className="block px-4 py-2 text-gray-200 transition-colors duration-200 hover:bg-slate-800/80"
                    href={item.path}
                    onClick={() => {
                      setState(false);
                      onCloseMenu();
                    }}
                  >
                    {item.title}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div
          className={`absolute right-0 top-full mt-2 min-w-[200px] transition-all duration-300 ease-in-out ${
            state
              ? 'translate-y-0 opacity-100'
              : 'pointer-events-none -translate-y-2 opacity-0'
          } `}
        >
          <ul className="overflow-hidden rounded-lg border border-slate-700/50 bg-slate-900/95 shadow-xl backdrop-blur-sm">
            {navigation.map((item, idx) => (
              <li
                key={idx}
                className={`transform transition-all duration-300 ease-in-out ${
                  state
                    ? 'translate-y-0 opacity-100'
                    : '-translate-y-2 opacity-0'
                } `}
                style={{
                  transitionDelay: `${idx * 75}ms`,
                }}
              >
                {item.title === 'Log out' ? (
                  <button
                    className="block w-full px-4 py-2 text-left text-gray-200 transition-colors duration-200 hover:bg-slate-800/80"
                    onClick={handleLogout}
                  >
                    {item.title}
                  </button>
                ) : (
                  <Link
                    className="block w-full px-4 py-2 text-gray-200 transition-colors duration-200 hover:bg-slate-800/80"
                    href={item.path}
                    onClick={() => setState(false)}
                  >
                    {item.title}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
