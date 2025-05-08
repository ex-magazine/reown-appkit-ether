
// import { PrismaClient  } from '../../prisma/generated/ticket';

// import { withAccelerate } from "@prisma/extension-accelerate"

// const getPrisma = () => new PrismaClient().$extends(withAccelerate());

// const globalForTicketDBPrismaClient = global as unknown as {
//   ticketDBPrismaClient: ReturnType<typeof getPrisma>;
// };

// export const ticketDBPrismaClient =
//   globalForTicketDBPrismaClient.ticketDBPrismaClient || getPrisma();

// if (process.env.NODE_ENV !== "production")
//   globalForTicketDBPrismaClient.ticketDBPrismaClient = ticketDBPrismaClient;


import { PrismaClient as MongodbClient } from '../../prisma/generated/ticket';
declare global {
  var mongodbPrisma: MongodbClient;
}
let mongodbPrisma: MongodbClient;

if (process.env.NODE_ENV === "production") {
  mongodbPrisma = new MongodbClient();
} else {
  if (!global.mongodbPrisma) {
    global.mongodbPrisma = new MongodbClient();
  }
  mongodbPrisma = global.mongodbPrisma;
}

export default mongodbPrisma;