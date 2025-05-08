'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, ChevronDown } from 'lucide-react';
import { NavbarLinks } from '@/utils/constants/NavbarLinks';
import { ConnectButton } from '@/components/ether/ConnectButton';
// Navbar Custom Component
import Image from 'next/image';
export default function Navbar() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const toggleDropdown = (name: string) => {
    setOpenDropdown(openDropdown === name ? null : name);
  };

  // Render Navbar Custom Component Conditionally
  return (
    <nav className="border-b z-50">
      <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
          <Link
            href="/"
            className="flex items-center gap-2 text-xl font-semibold"
          >
            
                      <Image
                        src="/reown-logo.png"
                        alt="Reown"
                        width={160}
                        height={70}
                        priority
                      />
                   
           
          </Link>
           </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-center">
              {NavbarLinks.map((item, index) => (
                <div key={index} className="group relative">
                  <button
                    onClick={() => toggleDropdown(String(item.name))}
                    className="flex items-center rounded-md px-3 py-2 text-sm font-medium tracking-tight hover:bg-gray-700 hover:text-white"
                  >
                    {item.name}
                    <ChevronDown className="ml-1 h-4 w-4" />
                  </button>
                  {openDropdown === item.name && (
                    <div className="absolute left-0 z-50 mt-2 w-48 rounded-md bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5">
                      <div
                        className="py-1"
                        role="menu"
                        aria-orientation="vertical"
                        aria-labelledby="options-menu"
                      >
                        {item.dropdown.map((dropdownItem) => (
                          <Link
                            key={dropdownItem.name}
                            href={dropdownItem.href}
                            className="block px-4 py-2 text-sm text-white hover:bg-gray-700 hover:text-white"
                            role="menuitem"
                          >
                            {dropdownItem.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
              <ConnectButton />
            </div>
          </div>
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden">
          <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
            {NavbarLinks.map((item, index) => (
              <div key={index} className="relative">
                <button
                  onClick={() => toggleDropdown(String(item.name))}
                  className="block flex w-full items-center justify-between rounded-md px-3 py-2 text-left text-base font-medium tracking-tight hover:bg-gray-700 hover:text-white"
                >
                  {item.name}
                  <ChevronDown className="ml-1 h-4 w-4" />
                </button>
                {openDropdown === item.name && (
                  <div className="pl-4">
                    {item.dropdown.map((dropdownItem) => (
                      <Link
                        key={dropdownItem.name}
                        href={dropdownItem.href}
                        className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                        onClick={() => setIsOpen(false)}
                      >
                        {dropdownItem.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <ConnectButton />
          </div>
        </div>
      )}
    </nav>
  );
}
