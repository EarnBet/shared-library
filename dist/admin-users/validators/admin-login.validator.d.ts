import { ValidatorConstraintInterface, ValidationArguments } from "class-validator";
import { AdminUsersService } from "../services/admin-users.service";
import { LoginPasswordValidator } from "../../users/validators/login-password.validator";
export declare class AdminLoginValidator extends LoginPasswordValidator implements ValidatorConstraintInterface {
    private service;
    constructor(service: AdminUsersService);
    validate(password: string, validationArguments?: ValidationArguments): Promise<boolean>;
    defaultMessage?(validationArguments?: ValidationArguments): string;
}
//# sourceMappingURL=admin-login.validator.d.ts.map