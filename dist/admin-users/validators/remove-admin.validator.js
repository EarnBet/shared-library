"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RemoveAdminUserValidator = void 0;
const common_1 = require("@nestjs/common");
const class_validator_1 = require("class-validator");
const users_shared_service_1 = require("../../users/services/users-shared.service");
const admin_users_service_1 = require("../services/admin-users.service");
const add_admin_validator_1 = require("./add-admin.validator");
let RemoveAdminUserValidator = class RemoveAdminUserValidator extends add_admin_validator_1.AddAdminUserValidator {
    constructor(users, adminUsers) {
        super(users);
        this.adminUsers = adminUsers;
    }
    async validate(field, validationArguments) {
        const isValid = await super.validate(field, validationArguments);
        if (!isValid) {
            return false;
        }
        const input = validationArguments.object;
        const adminToRemove = await this.adminUsers.getAdminUser(input.admin_user_id);
        if (!adminToRemove) {
            input.errorMessage = "user is not an admin";
            return false;
        }
        const authenticatedAdmin = await this.adminUsers.getAdminUser(input.user_id);
        const isAuthorized = authenticatedAdmin.role < adminToRemove.role;
        if (!isAuthorized) {
            input.errorMessage =
                "you do not have permission to remove this admin user";
            return false;
        }
        return true;
    }
};
RemoveAdminUserValidator = __decorate([
    (0, common_1.Injectable)(),
    (0, class_validator_1.ValidatorConstraint)({ name: "RemoveAdminUser", async: true }),
    __metadata("design:paramtypes", [users_shared_service_1.SharedUsersService,
        admin_users_service_1.AdminUsersService])
], RemoveAdminUserValidator);
exports.RemoveAdminUserValidator = RemoveAdminUserValidator;
//# sourceMappingURL=remove-admin.validator.js.map