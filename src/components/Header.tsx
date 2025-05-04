'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ConnectButton } from '@/components/ConnectButton';
import ThemeControlSwitch from '@/components/ethereumdapp/theme-control-switch';

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="z-10 w-full bg-white shadow-md">
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        <a
          href="/"
          className="text-2xl font-bold text-indigo-600 hover:text-indigo-800"
        >
          <Image
            src="/reown-logo.png"
            alt="Reown"
            width={150}
            height={70}
            priority
          />
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden space-x-6 md:flex">
          <a
            href="#features"
            className="text-gray-600 transition duration-300 hover:text-indigo-600"
          >
            Features
          </a>
          <a
            href="#docs"
            className="text-gray-600 transition duration-300 hover:text-indigo-600"
          >
            Documentation
          </a>
          <a
            href="#contact"
            className="text-gray-600 transition duration-300 hover:text-indigo-600"
          >
            Contact
          </a>
        </nav>

        {/* Connect Button */}
        <div className="flex items-center space-x-4">
          <ConnectButton />
          {/* Mobile Menu Button */}
          <button
            type="button"
            className="text-gray-600 hover:text-indigo-600 focus:text-indigo-800 focus:outline-none md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          </button>
        </div>
        <div className="flex items-center gap-2">
          <ThemeControlSwitch />
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <nav className="bg-white shadow-md md:hidden">
          <div className="container mx-auto px-6 py-4">
            <a
              href="#features"
              className="block py-2 text-gray-600 transition duration-300 hover:text-indigo-600"
            >
              Features
            </a>
            <a
              href="#docs"
              className="block py-2 text-gray-600 transition duration-300 hover:text-indigo-600"
            >
              Documentation
            </a>
            <a
              href="#contact"
              className="block py-2 text-gray-600 transition duration-300 hover:text-indigo-600"
            >
              Contact
            </a>
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;
