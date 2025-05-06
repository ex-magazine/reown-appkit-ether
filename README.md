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
