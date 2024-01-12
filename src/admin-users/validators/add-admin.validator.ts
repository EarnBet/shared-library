import { Injectable } from "@nestjs/common";
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from "class-validator";

import { SharedUsersService } from "../../users/services/users-shared.service";

import { AddAdminUserInput } from "../inputs/add-admin.input";

@Injectable()
@ValidatorConstraint({ name: "AddAdminUser", async: true })
export class AddAdminUserValidator implements ValidatorConstraintInterface {
  constructor(private users: SharedUsersService) {}

  async validate(
    field: any,
    validationArguments: ValidationArguments
  ): Promise<boolean> {
    const input = validationArguments.object as AddAdminUserInput;

    // make sure that either email or user is specified
    if (input.email == undefined && input.admin_user_id == undefined) {
      input.errorMessage = "must specify either email or user id";

      return false;
    }

    if (input.admin_user_id == input.user_id) {
      input.errorMessage = "cannot add or remove yourself as admin";

      return false;
    }

    const user =
      input.admin_user_id != undefined
        ? await this.users.getUserById(input.admin_user_id)
        : await this.users.findByEmail(input.email);

    // make sure that user exists
    if (!user) {
      input.errorMessage = "user not found";

      return false;
    }

    // save user id on input object
    input.admin_user_id = user.id;

    return true;
  }

  defaultMessage(validationArguments: ValidationArguments) {
    const input = validationArguments.object as AddAdminUserInput;

    return input.errorMessage ? input.errorMessage : "user not found";
  }
}
