import { Injectable } from "@nestjs/common";
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from "class-validator";

import { LoginUserInput } from "../inputs/login.input";

import { SharedUsersService } from "../services/users-shared.service";

@Injectable()
@ValidatorConstraint({ name: "LoginPassword", async: true })
export class LoginPasswordValidator implements ValidatorConstraintInterface {
  private shouldPromptToConfirmAccount = false;

  constructor(private publicUsersService: SharedUsersService) {}

  async validate(password: string, validationArguments?: ValidationArguments) {
    const input = validationArguments.object as LoginUserInput;
    const { username } = input;

    const { isPasswordValid, user } =
      await this.publicUsersService.isValidLogin({
        username,
        password,
      });

    input.userId = user?.id;

    this.shouldPromptToConfirmAccount = false;

    return isPasswordValid;
  }

  defaultMessage?(validationArguments?: ValidationArguments): string {
    return this.shouldPromptToConfirmAccount
      ? "Please check your email to confirm your account"
      : "incorrect username or password";
  }
}
