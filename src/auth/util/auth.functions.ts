import { sign } from "jsonwebtoken";
import { ValidationArguments } from "class-validator";

import { IAuthenticatedUser, IUserTokenData } from "./interfaces";

export const generateAuthToken = (user: IAuthenticatedUser): string => {
  const newData: IUserTokenData = {
    user_id: user.id,
    username: user.username,
  };

  return sign(newData, process.env.JWT_SECRET);
};

export function getAuthorizedUserIdForValidator(
  validationArguments: ValidationArguments
) {
  const userData: IUserTokenData = (validationArguments.object as any)
    ._authorizedUserData;

  return userData.user_id;
}
