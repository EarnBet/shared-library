import { applyDecorators } from "@nestjs/common";
import { Transform } from "class-transformer";
import { IsString, MinLength } from "class-validator";

import { trimTransform } from "../../validation/transform.functions";

export function IsValidUsernameFormat() {
  return applyDecorators(IsString(), Trim(), MinLength(4));
}

export function Trim() {
  return Transform(trimTransform);
}
