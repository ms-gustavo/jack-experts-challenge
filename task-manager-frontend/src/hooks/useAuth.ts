import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser, registerUser } from "../services/authService";
import { AuthContextType, User } from "../interface/interfaces";
import toast from "react-hot-toast";

export const useAuth = (): AuthContextType => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");

    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const loginHandler = async (email: string, password: string) => {
    try {
      const { token, user } = await loginUser(email, password);
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      toast.success(`Cadastro realizado. Bem-vindo, ${user.name}!`);
      setUser(user);
      navigate("/dashboard");
    } catch (error: unknown) {
      const errorString = (error as Error).message as string;
      toast.error(`Erro ao registrar. ${errorString}`);
      console.error("Erro ao registrar", error);
    }
  };

  const registerHandler = async (
    name: string,
    email: string,
    password: string
  ) => {
    try {
      const { token, user } = await registerUser(name, email, password);
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      toast.success(`Cadastro realizado. Bem-vindo, ${user.name}!`);
      setUser(user);
      navigate("/dashboard");
    } catch (error: unknown) {
      const errorString = (error as Error).message as string;
      toast.error(`Erro ao registrar. ${errorString}`);
      console.error("Erro ao registrar", error);
    }
  };

  const logoutHandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
  };

  const isAuthenticated = !!user;

  return {
    user,
    loginNewUser: loginHandler,
    registerNewUser: registerHandler,
    logout: logoutHandler,
    isAuthenticated,
  };
};
