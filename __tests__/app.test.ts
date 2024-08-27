import request from "supertest";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import app from "../src/server";
import prisma from "../src/config/prisma";

jest.mock("bcryptjs");

describe("Auth Controller", () => {
  describe("UserController - Register", () => {
    it("should register a user successfully", async () => {
      const mockUser = {
        id: 1,
        name: "Test User",
        email: "test@example.com",
        password: "hashedpassword",
      };

      const findSpy = jest
        .spyOn(prisma.user, "findUnique")
        .mockResolvedValue(null);

      (bcrypt.hash as jest.Mock).mockResolvedValue("hashedpassword");
      const findSpyCreate = jest
        .spyOn(prisma.user, "create")
        .mockResolvedValue(mockUser);

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
      findSpy.mockRestore();
      findSpyCreate.mockRestore();
    });

    it("should return 400 if email is already registered", async () => {
      const mockUser = {
        id: 1,
        name: "Test User",
        email: "test@example.com",
        password: "hashedpassword",
      };

      const findSpy = jest
        .spyOn(prisma.user, "findUnique")
        .mockResolvedValue(mockUser);

      const res = await request(app).post("/api/auth/register").send({
        name: "Test User",
        email: "test@example.com",
        password: "password123",
      });

      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty("message", "Email já cadastrado");
      findSpy.mockRestore();
    });

    it("should return 500 if there is an error during registration", async () => {
      const findSpy = jest
        .spyOn(prisma.user, "findUnique")
        .mockRejectedValue(new Error("Erro ao registrar usuário:"));

      const res = await request(app).post("/api/auth/register").send({
        name: "Test User",
        email: "test2@example.com",
        password: "password123",
      });

      expect(res.statusCode).toBe(500);
      expect(res.body).toHaveProperty(
        "message",
        expect.stringContaining("Erro ao registrar usuário:")
      );
      findSpy.mockRestore();
    });
  });

  describe("UserController - Login", () => {
    it("should login successfully with correct credentials", async () => {
      const mockUser = {
        id: 1,
        name: "Test User",
        email: "test@example.com",
        password: "hashedpassword",
      };

      const findSpy = jest
        .spyOn(prisma.user, "findUnique")
        .mockResolvedValue(mockUser);
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
      findSpy.mockRestore();
    });

    it("should return 401 if email is not found", async () => {
      const findSpy = jest
        .spyOn(prisma.user, "findUnique")
        .mockResolvedValue(null);
      const res = await request(app).post("/api/auth/login").send({
        email: "notfound@example.com",
        password: "password123",
      });

      expect(res.statusCode).toBe(401);
      expect(res.body).toHaveProperty("message", "Email ou senha inválidos");
      findSpy.mockRestore();
    });

    it("should return 401 if password is incorrect", async () => {
      const mockUser = {
        id: 1,
        name: "Test User",
        email: "test@example.com",
        password: "hashedpassword",
      };

      const findSpy = jest
        .spyOn(prisma.user, "findUnique")
        .mockResolvedValue(mockUser);
      (bcrypt.compare as jest.Mock).mockResolvedValue(false);

      const res = await request(app).post("/api/auth/login").send({
        email: "test@example.com",
        password: "wrongpassword",
      });

      expect(res.statusCode).toBe(401);
      expect(res.body).toHaveProperty("message", "Email ou senha inválidos");
      findSpy.mockRestore();
    });

    it("should return 500 if there is an error during login", async () => {
      const findSpy = jest
        .spyOn(prisma.user, "findUnique")
        .mockRejectedValue(new Error("Erro ao fazer login:"));

      const res = await request(app).post("/api/auth/login").send({
        email: "test@example.com",
        password: "password123",
      });

      expect(res.statusCode).toBe(500);
      expect(res.body).toHaveProperty(
        "message",
        expect.stringContaining("Erro ao fazer login:")
      );
      findSpy.mockRestore();
    });
  });
});

describe("TaskController", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  let token: string;
  let userId: number;
  beforeAll(async () => {
    const mockUser = {
      id: 2,
      name: "Test User",
      email: "test2@example.com",
      password: "hashedpassword",
    };
    const findSpy = jest
      .spyOn(prisma.user, "findUnique")
      .mockResolvedValue(null);
    (bcrypt.hash as jest.Mock).mockResolvedValue("hashedpassword");
    const findSpyCreate = jest
      .spyOn(prisma.user, "create")
      .mockResolvedValue(mockUser);

    const res = await request(app).post("/api/auth/register").send({
      name: "Test User",
      email: "test2@example.com",
      password: "password123",
    });
    token = res.body.token;
    userId = mockUser.id;
    findSpy.mockRestore();
    findSpyCreate.mockRestore();
  });
  describe("POST /api/tasks", () => {
    it("should create a new task for the authenticated user", async () => {
      const mockTask = {
        id: 1,
        title: "Test Task",
        description: "Task Description",
        completed: false,
        userId,
      };
      const findSpy = jest
        .spyOn(prisma.task, "create")
        .mockResolvedValue(mockTask);

      const res = await request(app)
        .post("/api/tasks/create")
        .set("Authorization", `Bearer ${token}`)
        .send({
          title: "Test Task",
          description: "Task Description",
        });

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty(
        "message",
        "Atividade criada com sucesso"
      );
      expect(res.body.task).toEqual(mockTask);
      findSpy.mockRestore();
    });

    it("should return 500 if there is an error during task registration", async () => {
      const findSpy = jest
        .spyOn(prisma.task, "create")
        .mockRejectedValue(new Error("Erro ao criar atividade:"));

      const res = await request(app)
        .post("/api/tasks/create")
        .set("Authorization", `Bearer ${token}`)
        .send({
          title: "Test Task",
          description: "Test Task Description",
        });

      expect(res.statusCode).toBe(500);
      expect(res.body).toHaveProperty(
        "message",
        expect.stringContaining("Erro ao criar atividade:")
      );
      findSpy.mockRestore();
    });
  });

  describe("GET /api/tasks/:id", () => {
    it("should return a task if the task belongs to the authenticated user", async () => {
      const mockTask = {
        id: 1,
        title: "Test Task",
        description: "Task Description",
        completed: false,
        userId,
      };
      const findSpy = jest
        .spyOn(prisma.task, "findUnique")
        .mockResolvedValue(mockTask);

      const res = await request(app)
        .get(`/api/tasks/${mockTask.id}`)
        .set("Authorization", `Bearer ${token}`);

      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual(mockTask);
      findSpy.mockRestore();
    });

    it("should return 403 if the task does not belong to the authenticated user", async () => {
      const mockTask = {
        id: 1,
        title: "Test Task",
        description: "Task Description",
        completed: false,
        userId: userId + 2,
      };

      const findSpy = jest
        .spyOn(prisma.task, "findUnique")
        .mockResolvedValue(mockTask);
      const res = await request(app)
        .get(`/api/tasks/${mockTask.id}`)
        .set("Authorization", `Bearer ${token}`);
      expect(res.statusCode).toBe(403);
      expect(res.body).toHaveProperty("message", "Acesso negado");
      findSpy.mockRestore();
    });

    it("should return 404 if the task is not found", async () => {
      const findSpy = jest
        .spyOn(prisma.task, "findUnique")
        .mockResolvedValue(null);

      const res = await request(app)
        .get(`/api/tasks/999`)
        .set("Authorization", `Bearer ${token}`);

      expect(res.statusCode).toBe(404);
      expect(res.body).toHaveProperty("message", "Tarefa não encontrada");
      findSpy.mockRestore();
    });

    it("should return 500 if there is an error during get individual task", async () => {
      const findSpy = jest
        .spyOn(prisma.task, "findUnique")
        .mockRejectedValue(new Error("Erro ao buscar tarefa:"));

      const res = await request(app)
        .get("/api/tasks/1")
        .set("Authorization", `Bearer ${token}`);

      expect(res.statusCode).toBe(500);
      expect(res.body).toHaveProperty(
        "message",
        expect.stringContaining("Erro ao buscar tarefa:")
      );
      findSpy.mockRestore();
    });
  });

  describe("PUT /api/tasks/:id", () => {
    it("should update the task if it belongs to the authenticated user", async () => {
      const mockTask = {
        id: 1,
        title: "Updated Task",
        description: "Updated Description",
        completed: true,
        userId,
      };
      const findSpy = jest
        .spyOn(prisma.task, "findUnique")
        .mockResolvedValue(mockTask);
      const findSpyUpdate = jest
        .spyOn(prisma.task, "update")
        .mockResolvedValue(mockTask);

      const res = await request(app)
        .put(`/api/tasks/${mockTask.id}`)
        .set("Authorization", `Bearer ${token}`)
        .send({
          title: "Updated Task",
          description: "Updated Description",
          completed: true,
        });

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty(
        "message",
        "Atividade atualizada com sucesso"
      );
      expect(res.body.task).toEqual(mockTask);
      findSpy.mockRestore();
      findSpyUpdate.mockRestore();
    });

    it("should return 403 if the task does not belong to the authenticated user", async () => {
      const mockTask = {
        id: 1,
        title: "Test Task",
        description: "Task Description",
        completed: false,
        userId: userId + 3,
      };

      const findSpy = jest
        .spyOn(prisma.task, "findUnique")
        .mockResolvedValue(mockTask);

      const res = await request(app)
        .put(`/api/tasks/${mockTask.id}`)
        .set("Authorization", `Bearer ${token}`)
        .send({
          title: "Updated Task",
          description: "Updated Description",
          completed: true,
        });

      expect(res.statusCode).toBe(403);
      expect(res.body).toHaveProperty("message", "Acesso negado");

      findSpy.mockRestore();
    });

    it("should return 404 if the task is not found", async () => {
      const findSpy = jest
        .spyOn(prisma.task, "findUnique")
        .mockResolvedValue(null);

      const res = await request(app)
        .put(`/api/tasks/999`)
        .set("Authorization", `Bearer ${token}`)
        .send({
          title: "Updated Task",
          description: "Updated Description",
          completed: true,
        });

      expect(res.statusCode).toBe(404);
      expect(res.body).toHaveProperty("message", "Tarefa não encontrada");
      findSpy.mockRestore();
    });

    it("should return 500 if there is an error during get individual task", async () => {
      const findSpy = jest
        .spyOn(prisma.task, "findUnique")
        .mockRejectedValue(new Error("Erro ao atualizar atividade:"));

      const res = await request(app)
        .put("/api/tasks/1")
        .set("Authorization", `Bearer ${token}`)
        .send({
          title: "Updated Task",
          description: "Updated Description",
          completed: true,
        });

      expect(res.statusCode).toBe(500);
      expect(res.body).toHaveProperty(
        "message",
        expect.stringContaining("Erro ao atualizar atividade:")
      );
      findSpy.mockRestore();
    });
  });

  describe("DELETE /api/tasks/:id", () => {
    it("should return 403 if the task does not belong to the authenticated user", async () => {
      const mockTask = {
        id: 1,
        title: "Test Task",
        description: "Task Description",
        completed: false,
        userId: userId + 3,
      };

      const findSpy = jest
        .spyOn(prisma.task, "findUnique")
        .mockResolvedValue(mockTask);

      const res = await request(app)
        .delete(`/api/tasks/${mockTask.id}`)
        .set("Authorization", `Bearer ${token}`);

      expect(res.statusCode).toBe(403);
      expect(res.body).toHaveProperty("message", "Acesso negado");

      findSpy.mockRestore();
    });

    it("should return 404 if the task is not found", async () => {
      const findSpy = jest
        .spyOn(prisma.task, "findUnique")
        .mockResolvedValue(null);

      const res = await request(app)
        .delete(`/api/tasks/999`)
        .set("Authorization", `Bearer ${token}`);

      expect(res.statusCode).toBe(404);
      expect(res.body).toHaveProperty("message", "Tarefa não encontrada");

      findSpy.mockRestore();
    });

    it("should delete the task if it belongs to the authenticated user", async () => {
      const mockTask = {
        id: 1,
        title: "Test Task",
        description: "Task Description",
        completed: false,
        userId,
      };

      const findSpy = jest
        .spyOn(prisma.task, "findUnique")
        .mockResolvedValue(mockTask);
      const findSpyDelete = jest
        .spyOn(prisma.task, "delete")
        .mockResolvedValue(mockTask);

      const res = await request(app)
        .delete(`/api/tasks/${mockTask.id}`)
        .set("Authorization", `Bearer ${token}`);

      expect(res.statusCode).toBe(204);
      findSpy.mockRestore();
      findSpyDelete.mockRestore();
    });

    it("should return 500 if there is an error during get individual task", async () => {
      const findSpy = jest
        .spyOn(prisma.task, "findUnique")
        .mockRejectedValue("Erro ao deletar tarefa");

      const res = await request(app)
        .delete(`/api/tasks/1`)
        .set("Authorization", `Bearer ${token}`);

      expect(res.statusCode).toBe(500);
      expect(res.body).toHaveProperty(
        "message",
        expect.stringContaining("Erro ao deletar tarefa")
      );
      findSpy.mockRestore();
    });
  });
});
