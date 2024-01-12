import { createParamDecorator, ExecutionContext } from "@nestjs/common";

import { RequestContext } from "../../http/request/interfaces";
import { getIpAddress } from "../../http/request/functions";

export function BodyWithUser(): ParameterDecorator {
  return createParamDecorator((data: string, ctx: ExecutionContext) => {
    const request: RequestContext = ctx.switchToHttp().getRequest();
    return {
      ...(request.body || {}),
      ip: getIpAddress(request),
      user_id: request.authorizedUserData.user_id,
      username: request.authorizedUserData.username,
      _authorizedUserData: request.authorizedUserData,
    };
  })();
}
