import { ValidationArguments } from "class-validator";
import { IAuthenticatedUser } from "./interfaces";
export declare const generateAuthToken: (user: IAuthenticatedUser) => string;
export declare function getAuthorizedUserIdForValidator(validationArguments: ValidationArguments): number;
//# sourceMappingURL=auth.functions.d.ts.map