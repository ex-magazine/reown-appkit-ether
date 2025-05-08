// import { PrismaClient } from '../../prisma/generated/media';
// import { withAccelerate } from "@prisma/extension-accelerate"

// const getPrisma = () => new PrismaClient().$extends(withAccelerate());

// const globalForUserDBPrismaClient = global as unknown as {
//   userDBPrismaClient: ReturnType<typeof getPrisma>;
// };

// export const userDBPrismaClient =
//   globalForUserDBPrismaClient.userDBPrismaClient || getPrisma();

// if (process.env.NODE_ENV !== "production")
//   globalForUserDBPrismaClient.userDBPrismaClient = userDBPrismaClient;

import { PrismaClient as pgsqlClient } from '../../prisma/generated/media';
// import { PrismaClient as pgsqlClient } from "@/prisma/generated/pgsqlClient";
declare global {
  var pgsqlPrisma: pgsqlClient;
}
let pgsqlPrisma: pgsqlClient;

if (process.env.NODE_ENV === "production") {
  pgsqlPrisma = new pgsqlClient();
} else {
  if (!global.pgsqlPrisma) {
    global.pgsqlPrisma = new pgsqlClient();
  }
  pgsqlPrisma = global.pgsqlPrisma;
}

export default pgsqlPrisma;