import { IsNotEmpty, IsString, IsBoolean, IsOptional } from "class-validator";

export class UpdateTaskDTO {
  @IsOptional()
  @IsString()
  @IsNotEmpty({ message: `O campo título é obrigatório.` })
  title?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty({ message: `O campo descrição é obrigatório.` })
  description?: string;

  @IsOptional()
  @IsBoolean()
  completed?: boolean;
}
