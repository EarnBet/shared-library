import { sign } from "jsonwebtoken";

import { IAuthenticatedUser, IUserTokenData } from "./interfaces";

export const generateAuthToken = (user: IAuthenticatedUser): string => {
  const newData: IUserTokenData = {
    user_id: user.id,
    username: user.username,
  };

  return sign(newData, process.env.JWT_SECRET);
};
