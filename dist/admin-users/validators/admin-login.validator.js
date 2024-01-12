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
exports.AdminLoginValidator = void 0;
const common_1 = require("@nestjs/common");
const class_validator_1 = require("class-validator");
const admin_users_service_1 = require("../services/admin-users.service");
const login_password_validator_1 = require("../../users/validators/login-password.validator");
let AdminLoginValidator = class AdminLoginValidator extends login_password_validator_1.LoginPasswordValidator {
    constructor(service) {
        super(service.users);
        this.service = service;
    }
    async validate(password, validationArguments) {
        const isValidPassword = await super.validate(password, validationArguments);
        if (!isValidPassword) {
            return false;
        }
        const input = validationArguments.object;
        input.adminUser = await this.service.getAdminUser(input.userId);
        return input.adminUser != null;
    }
    defaultMessage(validationArguments) {
        return "incorrect username or password";
    }
};
AdminLoginValidator = __decorate([
    (0, common_1.Injectable)(),
    (0, class_validator_1.ValidatorConstraint)({ name: "AdminLogin", async: true }),
    __metadata("design:paramtypes", [admin_users_service_1.AdminUsersService])
], AdminLoginValidator);
exports.AdminLoginValidator = AdminLoginValidator;
//# sourceMappingURL=admin-login.validator.js.map