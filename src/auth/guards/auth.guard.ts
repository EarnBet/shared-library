import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { IncomingHttpHeaders } from "http";

import { UnauthorizedError } from "../../http/exception/application-errors";
import { RequestContext } from "../../http/request/interfaces";
import { AuthService } from "../services/auth.service";
import { IUserTokenData } from "../util/interfaces";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<RequestContext>();

    console.log(request);

    const userData = this.getAuthorizedUserData(request.headers);

    console.log({ userData });

    if (!userData || !userData.user_id) {
      throw new UnauthorizedError();
    }

    request.authorizedUserData = userData;

    return true;
  }

  private getAuthorizedUserData(headers: IncomingHttpHeaders): IUserTokenData {
    const token = getAuthTokenFromRequestHeaders(headers);

    return token ? this.authService.getUserDataFromToken(token) : null;
  }
}

function getAuthTokenFromRequestHeaders(headers: IncomingHttpHeaders): string {
  console.log({ headers });

  //  authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJ1c2VybmFtZSI6IkVhcm5CZXREZXYiLCJpYXQiOjE3MDY2MjgzODB9.TUIW_aRElBquYh0C8f1s_HTwdJTKjD36OBODllOB4fM',

  console.log("authorization", headers.authorization);
  console.log("Authorization", headers.Authorization);

  if (headers.authorization || headers.Authorization) {
    let auth: string;

    if (headers.authorization) {
      auth = headers.authorization;
    }
    if (headers.Authorization) {
      auth = <string>headers.Authorization;
    }

    console.log({ auth });

    const authSplit = auth.split(" ");
    const [_, token] = auth.split(" ");

    console.log({ authSplit, token });
    console.log("0", authSplit[0]);
    console.log("0", authSplit[1]);

    return authSplit[1];
  }

  console.log("no authorization or Authorization header found");

  return null;
}
