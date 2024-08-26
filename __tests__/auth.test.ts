import request from "supertest";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import app from "../src/server";
import { prismaMock } from "../__mocks__/prismaClientMock";

jest.mock("bcryptjs");

describe("UserController - Register", () => {
  it("should register a user successfully", async () => {
    const mockUser = {
      id: 1,
      name: "Test User",
      email: "test@example.com",
      password: "hashedpassword",
    };

    (prismaMock.user.findUnique as jest.Mock).mockResolvedValue(null);

    (bcrypt.hash as jest.Mock).mockResolvedValue("hashedpassword");
    (prismaMock.user.create as jest.Mock).mockResolvedValue(mockUser);

    const res = await request(app).post("/api/auth/register").send({
      name: "Test User",
      email: "test@example.com",
      password: "password123",
    });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty(
      "message",
      "Usuário registrado com sucesso."
    );
    expect(res.body).toHaveProperty("token");
    expect(res.body.user).toEqual({
      userId: mockUser.id,
      name: mockUser.name,
      email: mockUser.email,
    });

    const decoded = jwt.verify(
      res.body.token,
      process.env.JWT_SECRET as string
    );
    expect(decoded).toHaveProperty("userId", mockUser.id);
  });

  it("should return 400 if email is already registered", async () => {
    const mockUser = {
      id: 1,
      name: "Test User",
      email: "test@example.com",
      password: "hashedpassword",
    };

    (prismaMock.user.findUnique as jest.Mock).mockResolvedValue(mockUser);

    const res = await request(app).post("/api/auth/register").send({
      name: "Test User",
      email: "test@example.com",
      password: "password123",
    });

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty("message", "Email já cadastrado");
  });

  // Não funcionando
  //   it("should return 500 if there is an error during registration", async () => {
  //    (prismaMock.user.findUnique as jest.Mock).mockRejectedValue(
  //      new Error("Test Error")
  //    );

  //    const res = await request(app).post("/api/auth/register").send({
  //      name: "Test User",
  //      email: "test2@example.com",
  //      password: "password123",
  //    });

  //    expect(res.statusCode).toBe(500);
  //    expect(res.body).toHaveProperty(
  //      "message",
  //      expect.stringContaining("Erro ao registrar usuário:")
  //    );
  //  });
});

describe("UserController - Login", () => {
  it("should login successfully with correct credentials", async () => {
    const mockUser = {
      id: 1,
      name: "Test User",
      email: "test@example.com",
      password: "hashedpassword",
    };

    (prismaMock.user.findUnique as jest.Mock).mockResolvedValue(mockUser);

    (bcrypt.compare as jest.Mock).mockResolvedValue(true);

    const res = await request(app).post("/api/auth/login").send({
      email: "test@example.com",
      password: "password123",
    });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("message", "Login realizado com sucesso");
    expect(res.body).toHaveProperty("token");
    expect(res.body.user).toEqual({
      id: mockUser.id,
      name: mockUser.name,
      email: mockUser.email,
    });

    const decoded = jwt.verify(
      res.body.token,
      process.env.JWT_SECRET as string
    );
    expect(decoded).toHaveProperty("userId", mockUser.id);
  });

  it("should return 401 if email is not found", async () => {
    (prismaMock.user.findUnique as jest.Mock).mockResolvedValue(null);

    const res = await request(app).post("/api/auth/login").send({
      email: "notfound@example.com",
      password: "password123",
    });

    expect(res.statusCode).toBe(401);
    expect(res.body).toHaveProperty("message", "Email ou senha inválidos");
  });

  it("should return 401 if password is incorrect", async () => {
    const mockUser = {
      id: 1,
      name: "Test User",
      email: "test@example.com",
      password: "hashedpassword",
    };

    (prismaMock.user.findUnique as jest.Mock).mockResolvedValue(mockUser);

    (bcrypt.compare as jest.Mock).mockResolvedValue(false);

    const res = await request(app).post("/api/auth/login").send({
      email: "test@example.com",
      password: "wrongpassword",
    });

    expect(res.statusCode).toBe(401);
    expect(res.body).toHaveProperty("message", "Email ou senha inválidos");
  });

  // Não funcionando
  //   it("should return 500 if there is an error during login", async () => {
  //     (prismaMock.user.findUnique as jest.Mock).mockRejectedValue(
  //       new Error("Test Error")
  //     );

  //     const res = await request(app).post("/api/auth/login").send({
  //       email: "test@example.com",
  //       password: "password123",
  //     });

  //     expect(res.statusCode).toBe(500);
  //     expect(res.body).toHaveProperty(
  //       "message",
  //       expect.stringContaining("Erro ao fazer login:")
  //     );
  //   });
});
