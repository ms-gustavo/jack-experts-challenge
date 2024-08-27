import { UpdateDataType } from "@/interface/interfaces";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const getAllTasks = async (token: string, page: number) => {
  try {
    const response = await axios.get(`${API_URL}tasks?page=${page}/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message || "Erro desconhecido");
    } else {
      throw new Error("Erro desconhecido");
    }
  }
};

export const createTask = async (
  token: string,
  title: string,
  description: string
) => {
  try {
    const response = await axios.post(
      `${API_URL}tasks/create`,
      {
        title,
        description,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return { data: response.data, status: response.status };
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message || "Erro desconhecido");
    } else {
      throw new Error("Erro desconhecido");
    }
  }
};

export const updateTask = async (
  token: string,
  taskId: number,
  data: UpdateDataType
) => {
  try {
    const response = await axios.put(`${API_URL}tasks/${taskId}/`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return { data: response.data, status: response.status };
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message || "Erro desconhecido");
    } else {
      throw new Error("Erro desconhecido");
    }
  }
};
