# Next.js 15 Social Media App

A full-stack social media app with infinite loading, optimistic updates, authentication, DMs, notifications, file uploads, and much more.

Watch the free tutorial on YouTube: https://www.youtube.com/watch?v=TyV12oBDsYI

![thumbnail 7](https://github.com/user-attachments/assets/686b37e4-3d16-4bc4-a7f2-9d152c3addf5)

npx prisma migrate dev --name init
npx prisma generate

npx npm-check-updates -u

Dependencies install command:
npm i lucia @lucia-auth/adapter-prisma prisma @prisma/client @tanstack/react-query @tanstack/react-query-devtools @tiptap/react @tiptap/starter-kit @tiptap/extension-placeholder @tiptap/pm uploadthing @uploadthing/react arctic date-fns ky next-themes react-cropper react-image-file-resizer react-intersection-observer react-linkify-it stream-chat stream-chat-react --legacy-peer-deps

npm i wagmi viem @web3modal/siwe @web3modal/wagmi --legacy-peer-deps

Dev dependencies install command:
npm i -D prettier eslint-config-prettier prettier-plugin-tailwindcss --legacy-peer-deps

Shadcn components add command:
npx --legacy-peer-deps shadcn-ui@latest add button dialog dropdown-menu form input label skeleton tabs textarea toast tooltip
