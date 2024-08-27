import { useState } from "react";
import { PaginationDemo } from "./Pagination";
import { Check } from "lucide-react";
import { CardProps } from "@/interface/interfaces";

export function TasksCards({
  tasks,
  onToggleComplete,
  onDelete,
  currentPage,
  totalPages,
  onPageChange,
  totalTasks,
}: CardProps) {
  const [expandedTaskId, setExpandedTaskId] = useState<number | null>(null);

  const handleDelete = (taskId: number) => {
    onDelete(taskId);
  };

  const toggleExpand = (taskId: number) => {
    setExpandedTaskId(expandedTaskId === taskId ? null : taskId);
  };

  return (
    <div className="w-full max-w-md sm:w-[380px] mx-auto my-5 bg-white shadow-lg rounded-lg overflow-hidden">
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
      <div className="p-4 space-y-4">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="border border-gray-200 rounded-md overflow-hidden"
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
                <h3 className="text-sm font-medium truncate">{task.title}</h3>
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
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(task.id);
                }}
                className="flex items-center justify-center p-2 text-red-600 hover:bg-red-100 rounded-full transition-colors duration-300 ease-in-out"
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
