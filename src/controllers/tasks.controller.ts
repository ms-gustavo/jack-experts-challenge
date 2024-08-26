import { Request, Response } from "express";
import prisma from "../config/prisma";

interface AuthRequest extends Request {
  user?: { userId: number };
}

export class TaskController {
  static async getAllTasks(req: AuthRequest, res: Response): Promise<void> {
    try {
      const tasks = await prisma.task.findMany({
        where: { userId: req.user!.userId },
      });
      if (tasks.length === 0) {
        res.status(204).json();
        return;
      }
      res.json(tasks);
    } catch (error: unknown) {
      res.status(500).json({ message: `Erro ao buscar tarefas: ${error}` });
    }
  }
}
