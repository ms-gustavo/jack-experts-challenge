// import { Link } from "react-router-dom";
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
          <DropdownMenuItem>
            <PenLine className="mr-2 h-4 w-4" />
            <span>Cadastrar Tarefa</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <List className="mr-2 h-4 w-4" />
            <span>Listar Tarefas</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
