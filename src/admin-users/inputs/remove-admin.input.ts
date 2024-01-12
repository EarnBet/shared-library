import { IsPositive, Validate } from "class-validator";

import { InputFromAuthorizedUser } from "../../auth/inputs/auth.inputs";
import { RemoveAdminUserValidator } from "../validators/remove-admin.validator";

export class RemoveAdminUserInput extends InputFromAuthorizedUser {
  @IsPositive()
  @Validate(RemoveAdminUserValidator)
  admin_user_id: number;

  errorMessage: string;
}
