import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useAuth } from "../contexts/AuthContext";
import toast from "react-hot-toast";
import { deleteTask, getAllTasks, updateTask } from "@/services/taskService";
import { getLocalStorage } from "@/utils/getLocalStorage";
import { TasksCards } from "@/components/TasksCards";
import Loader from "@/components/Loader";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import CreateTask from "@/components/CreateTask";
import { Task } from "@/interface/interfaces";

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [totalTasks, setTotalTasks] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const token = getLocalStorage("token");
  const location = useLocation();

  useEffect(() => {
    if (!user) {
      toast.error(`Erro`);
      return;
    }
    setLoading(true);

    const getTasks = async () => {
      try {
        const tasks = await getAllTasks(token!, currentPage);
        setCurrentPage(tasks.currentPage);
        setTotalPages(tasks.totalPages);
        setTotalTasks(tasks.totalTasks);
        setTasks(tasks.tasks);
      } catch (error: unknown) {
        toast.error(`Erro ao buscar tarefas, tente novamente mais tarde`);
        console.error((error as Error).message as string);
      } finally {
        setLoading(false);
      }
    };

    getTasks();
  }, [user, currentPage, token, location]);

  const handleToggleComplete = async (taskId: number) => {
    try {
      const currentTask = tasks.find((task) => task.id === taskId);
      if (!currentTask) {
        toast.error("Tarefa não encontrada");
        return;
      }

      const response = await updateTask(token!, taskId, {
        completed: !currentTask.completed,
      });
      if (response.status === 200) {
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task.id === taskId ? { ...task, completed: !task.completed } : task
          )
        );
      }
    } catch (error: unknown) {
      const errorString = (error as Error).message as string;
      toast.error("Erro ao atualizar o status da tarefa");
      console.error("Erro ao atualizar o status da tarefa:", errorString);
    }
  };

  const handleDeleteTask = async (taskId: number) => {
    try {
      const response = await deleteTask(token!, taskId);
      if (response.status === 204) {
        toast.success("Tarefa deletada com sucesso");
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
      }
    } catch (error: unknown) {
      toast.error("Erro ao deletar a tarefa");
      console.error("Erro ao deletar a tarefa:", (error as Error).message);
    }
  };

  const handleEditTask = async (
    taskId: number,
    title: string,
    description: string
  ) => {
    try {
      const response = await updateTask(token!, taskId, { title, description });
      if (response.status === 200) {
        toast.success("Tarefa atualizada com sucesso");
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task.id === taskId ? { ...task, title, description } : task
          )
        );
      }
    } catch (error: unknown) {
      toast.error("Erro ao atualizar a tarefa");
      console.error("Erro ao atualizar a tarefa:", (error as Error).message);
    }
  };

  const onPageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {user && <Navbar userName={user.name} />}

      <main className="pt-16 p-4">
        <Routes>
          <Route path="create-task" element={<CreateTask token={token} />} />
          <Route index element={<Navigate to="list-tasks" />} />
          <Route
            path="list-tasks"
            element={
              loading ? (
                <Loader />
              ) : tasks?.length > 0 ? (
                <TasksCards
                  tasks={tasks}
                  onToggleComplete={handleToggleComplete}
                  onDelete={handleDeleteTask}
                  onEdit={handleEditTask}
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={onPageChange}
                  totalTasks={totalTasks}
                />
              ) : (
                <p
                  id="no-tasks-available"
                  className="text-center my-5 text-gray-500"
                >
                  Nenhuma tarefa disponível
                </p>
              )
            }
          />
        </Routes>
      </main>
    </div>
  );
};

export default Dashboard;
