import { Request, Response } from "express";
import prisma from "../config/prisma";
import { CreateTaskDTO } from "../dtos/create-task.dto";

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

  static async createTask(req: AuthRequest, res: Response): Promise<void> {
    const taskData: CreateTaskDTO = req.body;

    const task = await prisma.task.create({
      data: {
        title: taskData.title,
        description: taskData.description,
        completed: taskData.completed,
        userId: req.user!.userId,
      },
    });

    res.status(200).json({ message: `Atividade criada com sucesso`, task });
  }
}
