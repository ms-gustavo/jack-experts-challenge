import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

describe("User model", () => {
  afterAll(async () => {
    await prisma.user.deleteMany();
    await prisma.$disconnect();
  });

  it("should create a user", async () => {
    const user = await prisma.user.create({
      data: {
        name: "Test User",
        email: "testuser@example.com",
        password: "securepassword",
      },
    });

    expect(user).toHaveProperty("id");
    expect(user.email).toBe("testuser@example.com");
  });
});
