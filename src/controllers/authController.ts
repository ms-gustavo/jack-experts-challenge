import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "../config/prisma";
import { User } from "@prisma/client";
import dotenv from "dotenv";
dotenv.config();

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password } = req.body as {
      name: string;
      email: string;
      password: string;
    };

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });
    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET as string
    );
    res
      .status(201)
      .json({ message: "Usuário criado com sucesso", token, userId: user.id });
  } catch (error: unknown) {
    res.status(500).json({ message: `Erro ao criar usuário`, error });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body as { email: string; password: string };
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (!user) {
      res.status(401).json({ message: `Email ou senha inválidos` });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(401).json({ message: `Email ou senha inválidos` });
      return;
    }
    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET as string
    );
    res
      .status(201)
      .json({
        message: `Login realizado com sucesso`,
        token,
        user: { id: user.id, name: user.name, email: user.email },
      });
  } catch (error: unknown) {
    res.status(500).json({ message: `Erro ao realizar login`, error });
  }
};
