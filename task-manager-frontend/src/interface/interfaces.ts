import { z } from "zod";
import {
  createTaskSchema,
  loginSchema,
  registerSchema,
} from "../utils/zodSchemas/zodSchemas";
import { AxiosResponse } from "axios";

export interface User {
  userId?: number;
  id?: number;
  name: string;
  email: string;
}

export interface UpdateDataType {
  title?: string;
  description?: string;
  completed?: boolean;
}

export interface AuthResponse extends AxiosResponse {
  status: number;
  message: string;
  token: string;
  user: User;
}

export interface AuthContextType {
  user: User | null;
  loginNewUser: (email: string, password: string) => Promise<void>;
  registerNewUser: (
    name: string,
    email: string,
    password: string
  ) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

export type Task = {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  userId: number;
};

export type CardProps = {
  tasks: Task[];
  onToggleComplete: (taskId: number) => void;
  onDelete: (taskId: number) => void;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  totalTasks: number;
};

export type RegisterFormData = z.infer<typeof registerSchema>;

export type LoginFormData = z.infer<typeof loginSchema>;

export type CreateTaskFormData = z.infer<typeof createTaskSchema>;
