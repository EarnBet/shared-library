import { Request } from "express";
import { IUserTokenData } from "../../auth/util/interfaces";
export interface RequestContext extends Request {
    authorizedUserData: IUserTokenData;
}
//# sourceMappingURL=interfaces.d.ts.map