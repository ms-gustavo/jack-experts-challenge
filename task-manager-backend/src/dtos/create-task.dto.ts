import { IsNotEmpty, IsString, IsOptional, IsBoolean } from "class-validator";

export class CreateTaskDTO {
  @IsString()
  @IsNotEmpty({ message: `O título da tarefa é obrigatório` })
  title: string = "";

  @IsString()
  @IsNotEmpty({ message: `A descrição da tarefa é obrigatória` })
  description: string = "";

  @IsOptional()
  @IsBoolean()
  completed?: boolean = false;
}
