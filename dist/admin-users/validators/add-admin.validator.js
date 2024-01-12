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
exports.AddAdminUserValidator = void 0;
const common_1 = require("@nestjs/common");
const class_validator_1 = require("class-validator");
const users_shared_service_1 = require("../../users/services/users-shared.service");
let AddAdminUserValidator = class AddAdminUserValidator {
    constructor(users) {
        this.users = users;
    }
    async validate(field, validationArguments) {
        const input = validationArguments.object;
        if (input.email == undefined && input.admin_user_id == undefined) {
            input.errorMessage = "must specify either email or user id";
            return false;
        }
        if (input.admin_user_id == input.user_id) {
            input.errorMessage = "cannot add or remove yourself as admin";
            return false;
        }
        const user = input.admin_user_id != undefined
            ? await this.users.getUserById(input.admin_user_id)
            : await this.users.findByEmail(input.email);
        if (!user) {
            input.errorMessage = "user not found";
            return false;
        }
        input.admin_user_id = user.id;
        return true;
    }
    defaultMessage(validationArguments) {
        const input = validationArguments.object;
        return input.errorMessage ? input.errorMessage : "user not found";
    }
};
AddAdminUserValidator = __decorate([
    (0, common_1.Injectable)(),
    (0, class_validator_1.ValidatorConstraint)({ name: "AddAdminUser", async: true }),
    __metadata("design:paramtypes", [users_shared_service_1.SharedUsersService])
], AddAdminUserValidator);
exports.AddAdminUserValidator = AddAdminUserValidator;
//# sourceMappingURL=add-admin.validator.js.map