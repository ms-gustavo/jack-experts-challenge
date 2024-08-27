import { Request, Response } from "express";
import { CreateUserDTO } from "../dtos/create-user.dto";
import bcrypt from "bcryptjs";
import prisma from "../config/prisma";
import jwt from "jsonwebtoken";
import { LoginDTO } from "../dtos/login.dto";

export class AuthController {
  static async register(req: Request, res: Response): Promise<Response> {
    try {
      const userData: CreateUserDTO = req.body;
      const emailToLowerCase = userData.email.toLowerCase();
      const userAlreadyExists = await prisma.user.findUnique({
        where: {
          email: emailToLowerCase,
        },
      });
      if (userAlreadyExists) {
        return res.status(400).json({ message: `Email já cadastrado` });
      }

      const hashedPassword = await bcrypt.hash(userData.password, 12);
      const user = await prisma.user.create({
        data: {
          name: userData.name,
          email: emailToLowerCase,
          password: hashedPassword,
        },
      });
      const token = jwt.sign(
        {
          userId: user.id,
        },
        process.env.JWT_SECRET as string
      );

      return res.status(201).json({
        message: "Usuário registrado com sucesso.",
        token,
        user: { userId: user.id, name: user.name, email: user.email },
      });
    } catch (error: any) {
      return res
        .status(500)
        .json({ message: `Erro ao registrar usuário: ${error.message}` });
    }
  }

  static async login(req: Request, res: Response): Promise<Response> {
    try {
      const userData: LoginDTO = req.body;
      const emailToLowerCase = userData.email.toLowerCase();
      const user = await prisma.user.findUnique({
        where: {
          email: emailToLowerCase,
        },
      });
      if (!user) {
        return res.status(401).json({ message: `Email ou senha inválidos` });
      }

      const isMatch = await bcrypt.compare(userData.password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: `Email ou senha inválidos` });
      }

      const token = jwt.sign(
        {
          userId: user.id,
        },
        process.env.JWT_SECRET as string
      );
      return res.status(201).json({
        message: `Login realizado com sucesso`,
        token,
        user: { id: user.id, name: user.name, email: user.email },
      });
    } catch (error: any) {
      return res.status(500).json({ message: `Erro ao fazer login: ${error}` });
    }
  }
}
