import { IsPositive } from "class-validator";
import { InputFromAuthorizedUser } from "../../auth/inputs/auth.inputs";

export class UserIdFromAdminInput extends InputFromAuthorizedUser {
  @IsPositive()
  user_id_from_admin: number;
}
