import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class LoginDTO {
  @IsEmail()
  @IsNotEmpty({ message: `O campo email é obrigatório.` })
  email: string = "";

  @IsString()
  @IsNotEmpty({ message: `O campo senha é obrigatório.` })
  password: string = "";
}
