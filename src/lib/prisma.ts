import { PrismaClient } from "@prisma/client";
import * as dotenv from "dotenv";

// Muat variabel lingkungan dari file .env
dotenv.config();

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

const databaseUrl = process.env.DATABASE_URL;

// Sekarang databaseUrl tidak akan undefined
if (!databaseUrl) {
  throw new Error("DATABASE_URL is missing in .env file");
}

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    datasources: {
      db: {
        url: databaseUrl,
      },
    },
    log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}