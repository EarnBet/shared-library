import { Allow } from "class-validator";

import { IUserTokenData } from "../util/interfaces";

export class InputFromAuthorizedUser {
  @Allow()
  user_id: number;
  @Allow()
  username: string;

  @Allow()
  _authorizedUserData: IUserTokenData;

  @Allow()
  ip: string;
}
