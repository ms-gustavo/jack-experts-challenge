import { execSync } from "child_process";
import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";
dotenv.config({ path: ".env.test" });
const prisma = new PrismaClient();

beforeAll(() => {
  console.log(`using ${process.env.DATABASE_URL}`);
  execSync("npm run test:prepare");
});

afterAll(async () => {
  await prisma.$disconnect();
});
