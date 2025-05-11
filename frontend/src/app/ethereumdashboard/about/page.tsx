import { AboutPageCardList } from '../utils/constants/AboutPageCardList';
import type AboutPageCardType from '../utils/types/AboutPageCardType';
import Link from 'next/link';
import type { Metadata } from 'next';

// Custom Metadata
export const metadata: Metadata = {
  title: 'About Page',
  description: 'About Page for the Ethereum Dashboard web application',
};

// Custom About Page Component
export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gray-800 px-4 py-10 text-gray-300 shadow-lg sm:px-6 lg:px-8">
      <section className="px-4 py-10 text-center">
        <div className="container mx-auto max-w-4xl">
          <h1 className="mb-8 bg-gradient-to-r from-gray-400 via-gray-200 to-gray-400 bg-clip-text text-5xl font-bold text-transparent">
            ABOUT
          </h1>
          <p className="mb-10 text-xl leading-relaxed text-gray-300">
            Explore the world of Ethereum with just one click. View wallet
            activity, recent transactions, asset holdings, ERC20/721 token data,
            prices, and so much more!
          </p>
          <Link
            href="https://github.com/CodingAbdullah"
            target="_blank"
            rel="noreferrer"
            className="inline-block transform rounded-full bg-gradient-to-r from-gray-600 to-gray-400 px-6 py-3 text-white transition-all duration-300 hover:scale-105 hover:from-gray-500 hover:to-gray-300"
          >
            Learn About the Developer
          </Link>
        </div>
      </section>
      <section className="px-4 py-20">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
            {AboutPageCardList.map(
              (feature: AboutPageCardType, index: number) => (
                <div
                  key={index}
                  className="transform overflow-hidden rounded-xl border-b border-gray-800 bg-gray-900 text-gray-300 shadow-lg transition-all duration-300 hover:scale-105"
                >
                  <div className="flex h-full flex-col items-center justify-between p-8 text-center">
                    <div>
                      <h3 className="mb-4 text-2xl font-semibold">
                        {feature.title}
                      </h3>
                      <p className="mb-6 text-gray-400">
                        {feature.description}
                      </p>
                    </div>
                    <Link
                      target="_blank"
                      rel="noreferrer"
                      href={String(feature.link)}
                      className="inline-block transform rounded-full bg-gradient-to-r from-gray-600 to-gray-400 px-6 py-2 text-white transition-all duration-300 hover:scale-105 hover:from-gray-500 hover:to-gray-300"
                    >
                      {feature.linkText}
                    </Link>
                  </div>
                </div>
              ),
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
