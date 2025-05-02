/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    staleTimes: {
      dynamic: 30,
    },
  },
  // devIndicators: true,
  serverExternalPackages: ['@node-rs/argon2'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'utfs.io',
        pathname: `/a/${process.env.NEXT_PUBLIC_UPLOADTHING_APP_ID}/*`,
      },
      {
        protocol: 'https',
        hostname: 'image.tmdb.org',
      },
      {
        protocol: 'https',
        hostname: 'coin-images.coingecko.com',
      },
      {
        protocol: 'https',
        hostname: 'logo.moralis.io',
      },
      {
        protocol: 'https',
        hostname: 'cdn.moralis.io',
      },
      {
        protocol: 'https',
        hostname: 'market-data-images.s3.us-east-1.amazonaws.com',
      },
    ],
  },


  rewrites: () => {
    return [
      {
        source: '/hashtag/:tag',
        destination: '/search?q=%23:tag',
      },
    ];
  },
};

export default nextConfig;
