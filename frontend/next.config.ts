import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  // experimental: {
  //   staleTimes: {
  //     dynamic: 30,
  //   },
  // },
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
      {
        protocol: 'https',
        hostname: 'gateway.pinata.cloud',
      },
      {
        protocol: "https",
        hostname: "assets.coingecko.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "play.skystrife.xyz",
        pathname: "**",
      }
    ],
  },
   async redirects() {
    return [
      {
        source: "/evmexplorer/contracts/mainnet",
        destination:
          "/evmexplorer/contracts/mainnet/0x22C1f6050E56d2876009903609a2cC3fEf83B415",
        permanent: true,
      },
      {
        source: "/evmexplorer/contracts/optimism",
        destination:
          "/evmexplorer/contracts/optimism/0x0b2C639c533813f4Aa9D7837CAf62653d097Ff85",
        permanent: true,
      },
      {
        source: "/evmexplorer/contracts/base",
        destination:
          "/evmexplorer/contracts/base/0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
        permanent: true,
      },
      {
        source: "/evmexplorer/contracts/mode",
        destination:
          "/evmexplorer/contracts/mode/0xDfc7C877a950e49D2610114102175A06C2e3167a",
        permanent: true,
      },
      {
        source: "/evmexplorer/contracts/zora",
        destination:
          "/evmexplorer/contracts/zora/0x4200000000000000000000000000000000000006",
        permanent: true,
      },
      {
        source: "/evmexplorer/contracts/redstone",
        destination:
          "/evmexplorer/contracts/redstone/0x32444d4DEb1f8FA35A235FF997D5a22aC74b0e48",
        permanent: true,
      },
      {
        source: "/evmexplorer/contracts/polygon",
        destination:
          "/evmexplorer/contracts/polygon/0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359",
        permanent: true,
      },
      {
        source: "/evmexplorer/contracts/arbitrum",
        destination:
          "/evmexplorer/contracts/arbitrum/0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9",
        permanent: true,
      },
      {
        source: "/evmexplorer/contracts/filecoin",
        destination:
          "/evmexplorer/contracts/filecoin/0x005E02A4A934142d8Dd476F192d0dD9c381b16b4",
        permanent: true,
      },
    ];
  },

  reactStrictMode: true,
  webpack: (config, context) => {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    });

    config.resolve.fallback = { fs: false };

    config.plugins.push(
      new context.webpack.IgnorePlugin({
        resourceRegExp: /^(pino-pretty|encoding)$/,
      }),
    );

    return config;
  },
};

export default nextConfig;



