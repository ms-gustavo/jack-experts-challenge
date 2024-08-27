import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateTaskFormData } from "@/interface/interfaces";
import { createTaskSchema } from "@/utils/zodSchemas/zodSchemas";
import { createTask } from "@/services/taskService";
import toast from "react-hot-toast";
import Loader from "./Loader";

type CreateTaskProps = {
  token: string | null;
};

const CreateTask: React.FC<CreateTaskProps> = ({ token }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateTaskFormData>({
    resolver: zodResolver(createTaskSchema),
  });

  const onSubmit = async (data: CreateTaskFormData) => {
    setLoading(true);
    try {
      const response = await createTask(token!, data.title, data.description);
      if (response.status === 200) {
        toast.success(response.data.message);
        reset();
      }
    } catch (error: unknown) {
      const errorString = (error as Error).message as string;
      toast.error(`Erro ao cadastrar: ${errorString}`);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-md">
      {loading ? (
        <Loader />
      ) : (
        <>
          <h1 className="text-2xl font-bold mb-4">Criar Nova Tarefa</h1>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700"
              >
                Título
              </label>
              <input
                id="title"
                type="text"
                {...register("title")}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
              {errors.title && (
                <p className="text-red-500 text-sm">{errors.title.message}</p>
              )}
            </div>
            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700"
              >
                Descrição
              </label>
              <textarea
                id="description"
                {...register("description")}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
              {errors.description && (
                <p className="text-red-500 text-sm">
                  {errors.description.message}
                </p>
              )}
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
            >
              Criar Tarefa
            </button>
          </form>
        </>
      )}
    </div>
  );
};

export default CreateTask;
