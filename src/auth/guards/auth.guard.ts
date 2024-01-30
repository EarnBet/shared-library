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
  if (headers.authorization || headers.Authorization) {
    let auth: string;

    if (headers.authorization) {
      auth = headers.authorization;
    }
    if (headers.Authorization) {
      auth = <string>headers.Authorization;
    }

    const [_, token] = auth.split(" ");

    return token;
  }

  return null;
}
