// src/components/Footer.tsx
'use client';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Popcorn,
  Clapperboard,
  Film,
  Ticket,
  PlaySquare,
  Tv2,
  Github,
  Twitter,
  Instagram,
  Facebook,
} from 'lucide-react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useState } from 'react';
import Marquee from './common/Marquee';
import { TitleText } from './TitleText';

const Footer = () => {
  const pathname = usePathname();
  const [email, setEmail] = useState('');
  const platforms = [
    { name: 'Netflix', icon: Popcorn, color: 'text-red-500' },
    { name: 'Prime Video', icon: Clapperboard, color: 'text-blue-400' },
    { name: 'Disney+', icon: Film, color: 'text-blue-300' },
    { name: 'HBO Max', icon: Ticket, color: 'text-purple-400' },
    { name: 'Hulu', icon: PlaySquare, color: 'text-green-400' },
    { name: 'Apple TV+', icon: Tv2, color: 'text-gray-300' },
  ];

  const socials = [
    { icon: Github, href: '#', name: 'github' },
    { icon: Twitter, href: '#', name: 'twitter' },
    { icon: Instagram, href: '#', name: 'instagram' },
    { icon: Facebook, href: '#', name: 'facebook' },
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
        <footer
          className={`relative overflow-hidden bg-slate-900 tracking-tight text-gray-100 antialiased ${['/login', '/register', '/dashboard'].includes(pathname) ||
            pathname.startsWith('/dashboard/')
            ? 'hidden'
            : 'block'
            }`}
        >
          {/* Animated background elements */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute -left-60 -top-60 h-[500px] w-[500px] animate-pulse rounded-full bg-purple-500/30 blur-3xl" />
            <div className="absolute -bottom-40 -right-40 h-[400px] w-[400px] animate-pulse rounded-full bg-blue-500/30 blur-3xl delay-1000" />
          </div>

          {/* Trending marquee */}
          <div>
            <Marquee speed={80} pauseOnHover className="py-3 backdrop-blur-md">
              <div className="flex items-center gap-8 px-4">
                <span className="text-sm text-white/80">Now Trending :</span>
                {[
                  'Stranger Things S5',
                  'Oppenheimer',
                  'Barbie',
                  'The Last of Us S2',
                  'Avatar 3',
                  'Dune: Part Two',
                  'The Gorge',
                  'The Brutalist',
                  'Companion',
                  'Mufasa: The Lion King',
                  'Captain America: Brave New World',
                  'Flight Risk',
                  'The White Lotus',
                  'Paddington in Peru',
                  'Nosferatu',
                  'My Fault: London',
                  'Severance',
                  'Dog Man',
                  'Solo Leveling',
                  'Bridget Jones: Mad About the Boy',
                  'Ne Zha 2',
                  'Wicked',
                ].map((title) => (
                  <div key={title} className="flex items-center gap-4">
                    <span className="font-medium text-white">{title}</span>
                    <span className="text-white/40">✦</span>
                  </div>
                ))}
              </div>
            </Marquee>
          </div>

          <div className="relative z-10 mx-auto max-w-7xl px-4 py-12">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-4 lg:grid-cols-5">
              {/* Brand Section */}
              <div className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  className="flex items-center gap-2"
                >
                  <Clapperboard className="h-8 w-8 text-purple-400" />
                  <TitleText />
                </motion.div>
                <p className="text-sm text-gray-400">
                  Your gateway to the cinematic universe. Explore, discover, and
                  enjoy endless entertainment across all platforms.
                </p>
              </div>

              {/* Quick Links */}
              <div className="space-y-4">
                <h3 className="mb-4 font-semibold text-white">Explore</h3>
                {[
                  { name: 'Movies', href: '/moviestmdb/movies' },
                  { name: 'TV Shows', href: '/moviestmdb/search' },
                  { name: 'Trending', href: '/moviestmdb/watchlist' },
                  { name: 'Genres', href: '/moviesprix/favorites' },
                  { name: 'Upcoming', href: '/moviesprix/home' },
                ].map((link) => (
                  <motion.div
                    key={link.name}
                    whileHover={{ x: 5 }}
                    className="group"
                  >
                    <Link
                      href={link.href}
                      className="flex items-center gap-2 text-gray-400 transition-colors hover:text-white"
                    >
                      <ArrowRight className="h-4 w-4 text-purple-400 opacity-0 transition-opacity group-hover:opacity-100" />
                      {link.name}
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* Platforms */}
              <div className="space-y-4">
                <h3 className="mb-4 font-semibold text-white">Platforms</h3>
                <div className="grid grid-cols-2 gap-3">
                  {platforms.map((platform) => (
                    <motion.div
                      key={platform.name}
                      whileHover={{ scale: 1.05 }}
                      className="flex items-center gap-2 rounded-lg bg-white/5 p-2 transition-colors hover:bg-white/10"
                    >
                      <platform.icon className={`h-5 w-5 ${platform.color}`} />
                      <span className="text-sm text-gray-300">
                        {platform.name}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Newsletter */}
              <div className="col-span-2 space-y-4">
                <h3 className="mb-4 font-semibold text-white">Stay Updated</h3>
                <p className="text-sm text-gray-400">
                  Subscribe to get exclusive updates, recommendations, and
                  special offers directly in your inbox.
                </p>
                <div className="flex gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-white placeholder-gray-500 focus:border-purple-400 focus:outline-none"
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="rounded-lg bg-gradient-to-r from-purple-500 to-blue-500 px-6 py-2 font-semibold text-white transition-all hover:shadow-lg hover:shadow-purple-500/30"
                  >
                    Subscribe
                  </motion.button>
                </div>
              </div>
            </div>

            {/* Bottom Section */}
            <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 md:flex-row">
              <div className="text-center text-sm text-gray-400">
                © {new Date().getFullYear()} CrowdFunding. All rights reserved.
              </div>

              <div className="flex items-center gap-6">
                {[
                  { name: 'Privacy Policy', href: '/' },
                  { name: 'Terms of Service', href: '/' },
                  { name: 'FAQ', href: '/' },
                ].map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="text-sm text-gray-400 transition-colors hover:text-white"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>

              <div className="flex items-center gap-4">
                {socials.map((social) => {
                  const Icon = social.icon;
                  return (
                    <Link
                      key={social.name}
                      href={social.href}
                      className="text-gray-400 transition-colors hover:text-white"
                    >
                      <span className="sr-only">{social.name}</span>
                      <Icon className="h-5 w-5" />
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </footer>
      )}
    </>
  );
};

export default Footer;
