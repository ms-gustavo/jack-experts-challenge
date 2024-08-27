import { useState } from "react";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => {
    setIsLogin((prevIsLogin) => !prevIsLogin);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {isLogin ? "Login no Task Manager" : "Registre-se no Task Manager"}
          </h2>
        </div>
        {isLogin ? <LoginForm /> : <RegisterForm />}
        <div className="text-center">
          <p
            className="text-sm text-gray-600 cursor-pointer underline"
            onClick={toggleForm}
          >
            {isLogin ? "Não tem conta? Registre-se" : "Já tem conta? Login"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
