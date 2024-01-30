import * as jwt from "jsonwebtoken";

import { IUserTokenData } from "../util/interfaces";

export class AuthService {
  constructor() {}

  getUserDataFromToken(token: string): IUserTokenData {
    // we should cache certain user data in the token
    // so that we don't have to query the database for the user data on every request
    let payload: IUserTokenData = null;

    try {
      //console.log({ JWT_SECRET: process.env.JWT_SECRET, token });

      payload = <IUserTokenData>jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      //console.error(error);
    }

    return payload;
  }
}
