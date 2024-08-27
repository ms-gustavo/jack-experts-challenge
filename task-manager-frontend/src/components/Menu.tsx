import { Link } from "react-router-dom";
import { List, PenLine } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/contexts/AuthContext";

export function MenuBar() {
  const { clearAuth } = useAuth();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          id="user-actions-button"
          className="text-slate-900"
          variant="outline"
        >
          Ações
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>
          <DropdownMenuItem asChild className="cursor-pointer">
            <Link to="create-task">
              <PenLine className="mr-2 h-4 w-4" />
              <span id="create-task-button">Cadastrar Tarefa</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild className="cursor-pointer">
            <Link to="list-tasks">
              <List className="mr-2 h-4 w-4" />
              <span id="list-tasks-button">Listar Tarefas</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Button
              id="logout-button"
              className="w-full"
              size={"icon"}
              onClick={clearAuth}
              variant="destructive"
            >
              Sair
            </Button>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
