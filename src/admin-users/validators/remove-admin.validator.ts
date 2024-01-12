import { Injectable } from "@nestjs/common";
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from "class-validator";

import { SharedUsersService } from "../../users/services/users-shared.service";

import { RemoveAdminUserInput } from "../inputs/remove-admin.input";
import { AdminUsersService } from "../services/admin-users.service";
import { AddAdminUserValidator } from "./add-admin.validator";

@Injectable()
@ValidatorConstraint({ name: "RemoveAdminUser", async: true })
export class RemoveAdminUserValidator
  extends AddAdminUserValidator
  implements ValidatorConstraintInterface
{
  constructor(
    users: SharedUsersService,
    private adminUsers: AdminUsersService
  ) {
    super(users);
  }

  async validate(
    field: any,
    validationArguments: ValidationArguments
  ): Promise<boolean> {
    const isValid = await super.validate(field, validationArguments);

    if (!isValid) {
      return false;
    }

    const input = validationArguments.object as RemoveAdminUserInput;

    const adminToRemove = await this.adminUsers.getAdminUser(
      input.admin_user_id
    );

    // make sure the user is an admin user
    if (!adminToRemove) {
      input.errorMessage = "user is not an admin";

      return false;
    }

    const authenticatedAdmin = await this.adminUsers.getAdminUser(
      input.user_id
    );

    // root admin can remove super admin, super admin can remove regular admin
    const isAuthorized = authenticatedAdmin.role < adminToRemove.role;

    // make sure the current user is at a greater permission level
    if (!isAuthorized) {
      input.errorMessage =
        "you do not have permission to remove this admin user";

      return false;
    }

    return true;
  }
}
