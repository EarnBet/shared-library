import { Injectable } from "@nestjs/common";
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from "class-validator";

import { AdminUsersService } from "../services/admin-users.service";
import { LoginPasswordValidator } from "../../users/validators/login-password.validator";
import { AdminLoginInput } from "../inputs/admin-login.input";

@Injectable()
@ValidatorConstraint({ name: "AdminLogin", async: true })
export class AdminLoginValidator
  extends LoginPasswordValidator
  implements ValidatorConstraintInterface
{
  constructor(private service: AdminUsersService) {
    super(service.users);
  }

  async validate(password: string, validationArguments?: ValidationArguments) {
    const isValidPassword = await super.validate(password, validationArguments);

    if (!isValidPassword) {
      return false;
    }

    const input = validationArguments.object as AdminLoginInput;

    input.adminUser = await this.service.getAdminUser(input.userId);

    // validate that this is an actual admin user
    return input.adminUser != null;
  }

  defaultMessage?(validationArguments?: ValidationArguments): string {
    return "incorrect username or password";
  }
}
