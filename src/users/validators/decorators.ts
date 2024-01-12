import { applyDecorators } from "@nestjs/common";
import { IsString, MinLength } from "class-validator";

import { Trim } from "../../validation/decorators";

export function IsValidUsernameFormat() {
  return applyDecorators(IsString(), Trim(), MinLength(4));
}
