import { useState } from "react";
import { PaginationDemo } from "./Pagination";
import { Check, Pencil, X } from "lucide-react";
import { CardProps } from "@/interface/interfaces";

export function TasksCards({
  tasks,
  onToggleComplete,
  onDelete,
  onEdit,
  currentPage,
  totalPages,
  onPageChange,
  totalTasks,
}: CardProps) {
  const [expandedTaskId, setExpandedTaskId] = useState<number | null>(null);
  const [editTaskId, setEditTaskId] = useState<number | null>(null);
  const [editedTitle, setEditedTitle] = useState<string>("");
  const [editedDescription, setEditedDescription] = useState<string>("");

  const handleDelete = (taskId: number) => {
    onDelete(taskId);
  };

  const handleEdit = (taskId: number) => {
    const task = tasks.find((t) => t.id === taskId);
    if (task) {
      setEditedTitle(task.title);
      setEditedDescription(task.description);
      setEditTaskId(taskId);
    }
  };

  const handleSave = async (taskId: number) => {
    if (editedTitle && editedDescription) {
      await onEdit(taskId, editedTitle, editedDescription);
      setEditTaskId(null);
    }
  };

  const handleCancel = () => {
    setEditTaskId(null);
  };

  const toggleExpand = (taskId: number) => {
    setExpandedTaskId(expandedTaskId === taskId ? null : taskId);
  };

  return (
    <div className="w-full max-w-7xl mx-auto my-5 bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-xl font-semibold">Tarefas</h2>
        <p className="text-sm text-gray-500">
          Você tem {totalTasks} tarefa{totalTasks > 1 && "s"}.
        </p>
      </div>
      <div className="mt-2">
        <PaginationDemo
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
          totalTasks={totalTasks}
        />
      </div>
      <div className="p-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="border border-gray-200 rounded-md overflow-hidden bg-white"
          >
            <div
              onClick={() => toggleExpand(task.id)}
              className="flex items-start space-x-4 p-4 w-full text-left cursor-pointer"
            >
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleComplete(task.id);
                }}
                className="flex items-center justify-center h-5 w-5 rounded-full border-2 focus:outline-none"
              >
                <span
                  className={`flex h-4 w-4 rounded-full border-2 ${
                    task.completed
                      ? "bg-green-500 border-green-700"
                      : "bg-sky-500 border-sky-700"
                  }`}
                >
                  {task.completed && <Check className="h-3 w-3 text-white" />}
                </span>
              </button>
              <div className="flex-1">
                {editTaskId === task.id ? (
                  <div>
                    <input
                      type="text"
                      value={editedTitle}
                      onChange={(e) => setEditedTitle(e.target.value)}
                      className="block w-full mb-2 p-2 border border-gray-300 rounded-md"
                      placeholder="Título"
                    />
                    <textarea
                      value={editedDescription}
                      onChange={(e) => setEditedDescription(e.target.value)}
                      className="block w-full mb-2 p-2 border border-gray-300 rounded-md"
                      placeholder="Descrição"
                    />
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleSave(task.id)}
                        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                      >
                        Salvar
                      </button>
                      <button
                        onClick={handleCancel}
                        className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                      >
                        Cancelar
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <h3 className="text-sm font-medium truncate">
                      {task.title}
                    </h3>
                    <p
                      className={`text-sm ${
                        expandedTaskId === task.id
                          ? "whitespace-normal"
                          : "truncate"
                      } text-gray-500`}
                    >
                      {task.description}
                    </p>
                  </div>
                )}
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEdit(task.id);
                  }}
                  className="flex items-center justify-center p-2 text-blue-600 hover:bg-blue-100 rounded-full transition-colors duration-300 ease-in-out"
                >
                  <Pencil className="h-5 w-5" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(task.id);
                  }}
                  className="flex items-center justify-center p-2 text-red-600 hover:bg-red-100 rounded-full transition-colors duration-300 ease-in-out"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
