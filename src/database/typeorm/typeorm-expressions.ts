import { Not, IsNull } from "typeorm";

export function IsNotNull() {
  return Not(IsNull());
}
