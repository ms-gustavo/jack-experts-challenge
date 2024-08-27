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

export function MenuBar() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="text-slate-900" variant="outline">
          Ações
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link to="create-task">
              <PenLine className="mr-2 h-4 w-4" />
              <span>Cadastrar Tarefa</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link to="list-tasks">
              <List className="mr-2 h-4 w-4" />
              <span>Listar Tarefas</span>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
