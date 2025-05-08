import Link from 'next/link';
import { ExternalLink } from 'lucide-react';
import { FooterLinks } from '../utils/constants/FooterLinks';
import SocialMediaIcon from './SocialMediaIcon';

// Footer Custom Component
export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex w-full flex-wrap justify-center gap-4 md:w-auto">
          <nav className="flex flex-wrap justify-center gap-4 md:gap-6">
            {FooterLinks.ecosystem.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="group flex items-center text-gray-400 transition-colors duration-300 hover:text-gray-100"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="font-mono tracking-wider">{link.name}</span>
                <ExternalLink className="ml-1 h-4 w-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </Link>
            ))}
          </nav>
        </div>
        <div className="mb-8 flex justify-center space-x-6 py-7">
          {FooterLinks.social.map((link) => (
            <SocialMediaIcon {...link} key={link.name} />
          ))}
        </div>
        <div className="border-t border-gray-800 pt-5 text-center">
          <p className="font-mono text-sm text-gray-500">
            &copy; {new Date().getFullYear()} ΞTHERΞUM DASHBOARD. Powered by
            Next.js
          </p>
        </div>
      </div>
    </footer>
  );
}
