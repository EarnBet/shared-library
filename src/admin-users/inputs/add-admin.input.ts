import { IsPositive, Validate, ValidateIf } from "class-validator";

import { InputFromAuthorizedUser } from "../../auth/inputs/auth.inputs";
import { IsValidEmailFormat } from "../../validation/decorators";

import { AddAdminUserValidator } from "../validators/add-admin.validator";

export class AddAdminUserInput extends InputFromAuthorizedUser {
  @ValidateIf((o: AddAdminUserInput) => o.admin_user_id == undefined)
  @IsValidEmailFormat()
  email: string;

  @ValidateIf((o: AddAdminUserInput) => o.email == undefined)
  @IsPositive()
  admin_user_id: number;

  // this validator is added to this extra property so that it runs everytime unconditionally
  // the other two validators above are conditional validators that will not run all the time
  @Validate(AddAdminUserValidator)
  errorMessage: string;
}
