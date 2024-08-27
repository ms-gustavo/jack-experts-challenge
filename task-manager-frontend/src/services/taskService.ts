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

interface DataType {
  title?: string;
  description?: string;
  completed?: boolean;
}

export const updateTask = async (
  token: string,
  taskId: number,
  data: DataType
) => {
  try {
    const response = await axios.put(`${API_URL}tasks/${taskId}/`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response);
    return { data: response.data, status: response.status };
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message || "Erro desconhecido");
    } else {
      throw new Error("Erro desconhecido");
    }
  }
};
