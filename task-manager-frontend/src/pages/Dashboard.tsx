import React from "react";
import Navbar from "../components/Navbar";
import { useAuth } from "../contexts/AuthContext";

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-100">
      {user && <Navbar userName={user.name} />}

      <main className="pt-16 md:pt-4 p-4">
        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
        <p>Bem-vindo ao painel de controle do Task Manager!</p>
      </main>
    </div>
  );
};

export default Dashboard;
