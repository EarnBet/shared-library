import { ValidationArguments, ValidatorConstraintInterface } from "class-validator";
import { SharedUsersService } from "../../users/services/users-shared.service";
import { AdminUsersService } from "../services/admin-users.service";
import { AddAdminUserValidator } from "./add-admin.validator";
export declare class RemoveAdminUserValidator extends AddAdminUserValidator implements ValidatorConstraintInterface {
    private adminUsers;
    constructor(users: SharedUsersService, adminUsers: AdminUsersService);
    validate(field: any, validationArguments: ValidationArguments): Promise<boolean>;
}
//# sourceMappingURL=remove-admin.validator.d.ts.map