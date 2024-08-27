import { Request, Response } from "express";
import prisma from "../config/prisma";
import { CreateTaskDTO } from "../dtos/create-task.dto";
import { UpdateTaskDTO } from "../dtos/update-task.dto";

interface AuthRequest extends Request {
  user?: { userId: number };
}

export class TaskController {
  static async getTask(req: AuthRequest, res: Response): Promise<Response> {
    const { id } = req.params;
    try {
      const task = await prisma.task.findUnique({
        where: { id: Number(id) },
      });
      if (!task) {
        return res.status(404).json({ message: "Tarefa não encontrada" });
      }
      if (task.userId !== req.user!.userId) {
        return res.status(403).json({ message: "Acesso negado" });
      }
      return res.json(task);
    } catch (error: unknown) {
      return res
        .status(500)
        .json({ message: `Erro ao buscar tarefa: ${error}` });
    }
  }

  static async getAllTasks(req: AuthRequest, res: Response): Promise<Response> {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const pageSize = parseInt(req.query.pageSize as string) || 10;
      const skip = (page - 1) * pageSize;

      const totalTasks = await prisma.task.count({
        where: { userId: req.user!.userId },
      });

      if (totalTasks === 0) {
        return res.status(204).json();
      }
      const tasks = await prisma.task.findMany({
        where: { userId: req.user!.userId },
        take: pageSize,
        skip,
      });

      const totalPages = Math.ceil(totalTasks / pageSize);
      return res.json({ tasks, currentPage: page, totalPages, totalTasks });
    } catch (error: unknown) {
      return res
        .status(500)
        .json({ message: `Erro ao buscar tarefas: ${error}` });
    }
  }

  static async createTask(req: AuthRequest, res: Response): Promise<Response> {
    try {
      const taskData: CreateTaskDTO = req.body;

      const task = await prisma.task.create({
        data: {
          ...taskData,
          userId: req.user!.userId,
        },
      });

      return res
        .status(200)
        .json({ message: `Atividade criada com sucesso`, task });
    } catch (error: unknown) {
      return res
        .status(500)
        .json({ message: `Erro ao criar atividade: ${error}` });
    }
  }

  static async updateTask(req: AuthRequest, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const updateTask: UpdateTaskDTO = req.body;

      const task = await prisma.task.findUnique({
        where: { id: Number(id) },
      });
      if (!task) {
        return res.status(404).json({ message: "Tarefa não encontrada" });
      }

      if (task.userId !== req.user!.userId) {
        return res.status(403).json({ message: "Acesso negado" });
      }
      const updatedTask = await prisma.task.update({
        where: { id: Number(id) },
        data: {
          ...updateTask,
        },
      });
      return res.status(200).json({
        message: `Atividade atualizada com sucesso`,
        task: updatedTask,
      });
    } catch (error: unknown) {
      return res
        .status(500)
        .json({ message: `Erro ao atualizar atividade: ${error}` });
    }
  }

  static async deleteTask(req: AuthRequest, res: Response): Promise<Response> {
    const { id } = req.params;

    try {
      const task = await prisma.task.findUnique({
        where: { id: Number(id) },
      });
      if (!task) {
        return res.status(404).json({ message: "Tarefa não encontrada" });
      }

      if (task.userId !== req.user!.userId) {
        return res.status(403).json({ message: "Acesso negado" });
      }

      await prisma.task.delete({
        where: { id: Number(id) },
      });
      return res.status(204).send();
    } catch (error: unknown) {
      return res
        .status(500)
        .json({ message: `Erro ao deletar tarefa ${error}` });
    }
  }
}
