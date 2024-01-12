import { IsString, IsNotEmpty, Validate } from "class-validator";
import { AdminLoginValidator } from "../validators/admin-login.validator";
import { LoginUserInput } from "../../users/inputs/login.input";
import { AdminUser } from "../entities/admin-user.entity";

export class AdminLoginInput extends LoginUserInput {
  @IsString()
  @IsNotEmpty()
  @Validate(AdminLoginValidator)
  password: string;

  adminUser: AdminUser;
}
