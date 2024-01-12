import { applyDecorators } from "@nestjs/common";
import { Transform } from "class-transformer";
import { IsEmail, IsString } from "class-validator";

import { emailTransform } from "./transform.functions";

export function IsValidEmailFormat() {
  return applyDecorators(IsString(), Transform(emailTransform), IsEmail());
}
