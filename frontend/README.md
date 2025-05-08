This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).
 
 ## Getting Started
 
 
 ```bash
 bun dev
 ```
 
 Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
 
 You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.
 
 This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load Inter, a custom Google Font.
 
 ## Learn More
 
## Deploy on Vercel
 
 The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.
 
 Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
 
 ```bash
 npx prisma migrate dev --name init
 npx prisma generate
 npx npm-check-updates -u
 ```
 
 ```bash
 npm i lucia @lucia-auth/adapter-prisma prisma @prisma/client @tanstack/react-query @tanstack/react-query-devtools @tiptap/react @tiptap/starter-kit @tiptap/extension-placeholder @tiptap/pm uploadthing @uploadthing/react arctic date-fns ky next-themes react-cropper react-image-file-resizer react-intersection-observer react-linkify-it stream-chat stream-chat-react --legacy-peer-deps

 npm install --save-dev eslint @eslint/js @types/eslint__js typescript typescript-eslint
 ```

 ```bash
 npx --legacy-peer-deps shadcn-ui@latest add button dialog dropdown-menu form input label skeleton tabs textarea toast tooltip
 ```
 
 # Stylish Ethereum DApp
 
 Create stylish Ethereum Dapp
 
 ## Feature
 
 ### Account
 
 - connect/Disconnect wallet
 - account status
 
 ### Network
 - network status
 - switching network
 
 ### Smart contract launcher
 
 - read/white the function specified in the ABI
 - includes ERC20, ERC721, ERC4626 ABI
 
 ### Unit converter
 
 - convert Ether to Gwei, Wei
 ### Sign message
 
 - signing a message
 - recover signed address
 
 ### Send transaction
 
 - send native token
 
 ### Transaction center
 
 - watching pending transaction
 - latest tx receipt
 - toasting transaction status
 
 ### Metadata
 
 - error boundary component
 - custom 404 Not found page
 - images(icon, opengraph)
 
 ## Tech Spec
 Core
 
 - React
 - Next.js
 
 EVM
 
 - wagmi
 - viem
 
 State management
 
 - zustand
 
 Styling
 
 - tailwindcss
 - shadcn/ui
 
 Testing
 - Vitest
 - React Testing Library
 
 Code Formatter
 
 - ESLint
 - Prettier
 
 ## Getting Started
 
 ```bash
 yarn create next-app --example https://github.com/StyleList94/stylish-ethereum-dapp
 ```

# Ethereum Dashboard

### Live Ethereum Wallet Dashboard for Blockchain Analytics

Explore your Ethereum wallet with an all-in-one dashboard built using **Next.js** and hosted cost-free on **Vercel**.

[Ethereum Dashboard](https://ethereumdashboard.dev)

---

## 🚀 Features

### Wallet & Asset Analytics

- **ERC20/721 Holdings:** View all tokens and NFTs in your wallet.
- **ERC20/721 Collection Analytics:** Detailed insights on token and NFT collections.
- **Transactions:** Analyze your complete transaction history.
- **Wallet Analytics:** Get in-depth metrics on wallet performance.

### Market Data & Pricing

- **Coin Prices & ERC20 Prices:** Live data for cryptocurrency and token prices.
- **Global Market Data:** Keep track of the market cap, volume, and trends globally.
- **Trending Coins/Collections:** Discover hot projects and market movers.
- **Top Coins/Collections:** Track leading cryptocurrencies and NFT collections.
- **Live Pricing Data:** Enjoy real-time pricing for tokens and NFTs.

### Layer Two Support

- **Layer Two Dashboards:** Get insights for Polygon, Arbitrum, and Optimism.

### Ethereum Tools

- **ENS Integration:** Resolve wallet addresses to ENS names.
- **Ethereum Gas Tracker:** Monitor gas prices in real time.
- **Market Insights:** Gather detailed information about the latest market conditions.
- **Staking/Validators:** Lookup information related to Ethereum validators and staking.
- **ERC20/721 Lookups:** Quickly find data on tokens and NFTs.
- **EIP Info:** Learn about Ethereum Improvement Proposals directly from the dashboard.

---

## 🔌 APIs and Integrations

### Core APIs

- **Alchemy:** Blockchain data provider for wallet balances, transaction history, and token details.
- **CoinGecko:** Fetch live market data, trending coins, and pricing details.
- **Transpose:** Advanced analytics and wallet history queries.
- **Moralis:** Multi-chain support for NFTs and tokens.

### Marketplace APIs

- **Opensea:** Insights into trending NFT collections, metadata, and floor prices.

### Utility APIs

- **Beaconchain** Insights into Ethereum staking and validators.
- **BlockNative:** Real-time Ethereum gas price monitoring.
- **Etherscan:** Transaction details and blockchain explorer integration.

---

## 🛠️ Built With

- **Next.js:** Next-generation React.js framework for seamless server-side rendering and static site generation.
- **Shadcn/UI:** Component library for rapid development.
- **Lucide-React/Font-Awesome:** Icon Libraries for rapid development.
- **V0.dev:** AI-powered application for rapidly prototyping and building Next.js applications.
- **Vercel AI SDK:** NPM package used for powering AI-generated market insights.
- **Tailwind CSS:** For modern, responsive UI designs.
- **Node.js:** Backend integrations with APIs.
- **Vercel Hosting:** Application is deployed cost-free using Vercel.

---

## 🌐 Deployment

- **Domain:** [Ethereum Dashboard](https://ethereumdashboard.dev)
- **Hosting:** Deployed cost-free on **Vercel**, leveraging its robust serverless capabilities.

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** and **npm** installed.
- API keys for Alchemy, BeaconChain, CoinGecko, Transpose, Moralis, Opensea, BlockNative, and Etherscan.

### Installation

1. Clone the repository and run <code>npm install</code> to add in the necessary dependencies:

   ```bash
   git clone https://github.com/CodingAbdullah/Ethereum-Wallet-Dashboard.git
   npm install

   ```

2. Add in your <b>API secrets</b> in a <code>.env</code> file located in the root of the project:

   ```bash
    ETHERSCAN_API_KEY=''
    MORALIS_API_KEY=''
    BLK_API_KEY=''
    BEACON_CHAIN_API_KEY=''
    ALCHEMY_API_KEY=''
    COINGECKO_API_KEY=''
    GROQ_API_KEY=''
    OPENSEA_API_KEY=''
    TRANSPOSE_API_KEY=''
    PORT=''

   ```

3. Run the local development environment:
   ```bash
   npm run dev
   ```

Tap Cash is a fintech smart wallet app built with Node.js and Express.js, allowing users to store multiple payment methods, track spending, and make transactions with ease. Designed and implemented the database schema using Prisma ORM and used PostgreSQL Database Server. Hosted the APIs on Render to provide high availability and scalability