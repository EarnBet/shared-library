import { ValidationArguments, ValidatorConstraintInterface } from "class-validator";
import { SharedUsersService } from "../services/users-shared.service";
export declare class LoginPasswordValidator implements ValidatorConstraintInterface {
    private publicUsersService;
    private shouldPromptToConfirmAccount;
    constructor(publicUsersService: SharedUsersService);
    validate(password: string, validationArguments?: ValidationArguments): Promise<boolean>;
    defaultMessage?(validationArguments?: ValidationArguments): string;
}
//# sourceMappingURL=login-password.validator.d.ts.map