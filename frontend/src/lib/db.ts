import { PrismaClient } from '@prisma/client';

const prismaClientSingleton = () => {
  return new PrismaClient();
};

declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

export const db = globalThis.prismaGlobal ?? prismaClientSingleton();

if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = db;



// import { PrismaClient as PrismaClientMedia } from '../../prisma/generated/media';
// import { PrismaClient as PrismaClientTicket } from '../../prisma/generated/ticket';

// // Define interfaces for our Prisma clients
// interface PrismaClients {
//   mongodb: PrismaClientTicket;
//   postgres: PrismaClientMedia;
// }

// // Create singleton function that returns both clients
// const prismaClientSingleton = (): PrismaClients => {
//   return {
//     mongodb: new PrismaClientTicket({
//       datasources: {
//         db: {
//           url: process.env.DATABASE_URL,
//         },
//       },
//     }),
//     postgres: new PrismaClientMedia({
//       datasources: {
//         db: {
//           url: process.env.POSTGRES_PRISMA_URL,
//         },
//       },
//     }),
//   };
// };

// // Extend global type to include our prisma clients
// declare global {
//   var prismaGlobal: undefined | PrismaClients;
// }

// // Create or reuse the singleton instance
// export const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

// // Export the combined client and individual clients for direct access



// // Save the instance in development to prevent multiple instances in hot reloading
// if (process.env.NODE_ENV !== "production") globalThis.prismaGlobal = prisma;


