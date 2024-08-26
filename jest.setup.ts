import { prismaMock } from "./__mocks__/prismaClientMock";
jest.mock("@prisma/client", () => {
  return {
    PrismaClient: jest.fn(() => prismaMock),
  };
});
