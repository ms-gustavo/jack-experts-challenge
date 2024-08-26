import { Request, Response } from "express";
import { CreateUserDTO } from "../dtos/create-user.dto";
import bcrypt from "bcryptjs";
import prisma from "../config/prisma";
import jwt from "jsonwebtoken";
import { LoginDTO } from "../dtos/login.dto";

export class AuthController {
  static async register(req: Request, res: Response) {
    const userData: CreateUserDTO = req.body;
    const emailToLowerCase = userData.email.toLowerCase();
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
  }

  static async login(req: Request, res: Response) {
    const userData: LoginDTO = req.body;
    const emailToLowerCase = userData.email.toLowerCase();
    const user = await prisma.user.findUnique({
      where: {
        email: emailToLowerCase,
      },
    });
    if (!user) {
      res.status(401).json({ message: `Email ou senha inválidos` });
      return;
    }

    const isMatch = await bcrypt.compare(userData.password, user.password);
    if (!isMatch) {
      res.status(401).json({ message: `Email ou senha inválidos` });
      return;
    }

    const token = jwt.sign(
      {
        userId: user.id,
      },
      process.env.JWT_SECRET as string
    );
    res.status(201).json({
      message: `Login realizado com sucesso`,
      token,
      user: { id: user.id, name: user.name, email: user.email },
    });
  }
}
