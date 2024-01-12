import { applyDecorators } from "@nestjs/common";
import { Transform } from "class-transformer";
import { IsEmail, IsString } from "class-validator";

import { emailTransform, trimTransform } from "./transform.functions";

export function IsValidEmailFormat() {
  return applyDecorators(IsString(), Transform(emailTransform), IsEmail());
}

export function Trim() {
  return Transform(trimTransform);
}
