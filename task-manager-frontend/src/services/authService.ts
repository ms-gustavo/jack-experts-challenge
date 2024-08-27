import axios from "axios";

import { AuthResponse } from "../interface/interfaces";

const API_URL = import.meta.env.VITE_API_URL;

export const registerUser = async (
  name: string,
  email: string,
  password: string
): Promise<AuthResponse> => {
  try {
    const response = await axios.post<AuthResponse>(`${API_URL}auth/register`, {
      name,
      email,
      password,
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

export const loginUser = async (
  email: string,
  password: string
): Promise<AuthResponse> => {
  try {
    const response = await axios.post<AuthResponse>(`${API_URL}auth/login`, {
      email,
      password,
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
