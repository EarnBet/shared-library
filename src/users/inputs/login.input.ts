import { IsNotEmpty, IsString, Validate } from "class-validator";

import { LoginPasswordValidator } from "../validators/login-password.validator";
import { IsValidUsernameFormat } from "../validators/decorators";

export class LoginUserInput {
  @IsValidUsernameFormat()
  username: string;

  @IsString()
  @IsNotEmpty()
  @Validate(LoginPasswordValidator)
  password: string;

  userId: number;
}
