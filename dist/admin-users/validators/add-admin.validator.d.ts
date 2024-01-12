import { ValidationArguments, ValidatorConstraintInterface } from "class-validator";
import { SharedUsersService } from "../../users/services/users-shared.service";
export declare class AddAdminUserValidator implements ValidatorConstraintInterface {
    private users;
    constructor(users: SharedUsersService);
    validate(field: any, validationArguments: ValidationArguments): Promise<boolean>;
    defaultMessage(validationArguments: ValidationArguments): string;
}
//# sourceMappingURL=add-admin.validator.d.ts.map