import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class CreateUserDTO {
  @IsEmail()
  @IsNotEmpty({ message: `O campo email é obrigatório.` })
  email: string = "";

  @IsString()
  @IsNotEmpty({ message: `O campo nome é obrigatório.` })
  name: string = "";

  @IsString()
  @MinLength(6, { message: `A senha deve ter no mínimo 6 caracteres.` })
  @IsNotEmpty({ message: `O campo senha é obrigatório.` })
  password: string = "";
}
