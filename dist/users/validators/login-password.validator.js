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
exports.LoginPasswordValidator = void 0;
const common_1 = require("@nestjs/common");
const class_validator_1 = require("class-validator");
const users_shared_service_1 = require("../services/users-shared.service");
let LoginPasswordValidator = class LoginPasswordValidator {
    constructor(publicUsersService) {
        this.publicUsersService = publicUsersService;
        this.shouldPromptToConfirmAccount = false;
    }
    async validate(password, validationArguments) {
        const input = validationArguments.object;
        const { username } = input;
        const { isPasswordValid, user } = await this.publicUsersService.isValidLogin({
            username,
            password,
        });
        input.userId = user === null || user === void 0 ? void 0 : user.id;
        this.shouldPromptToConfirmAccount = false;
        return isPasswordValid;
    }
    defaultMessage(validationArguments) {
        return this.shouldPromptToConfirmAccount
            ? "Please check your email to confirm your account"
            : "incorrect username or password";
    }
};
LoginPasswordValidator = __decorate([
    (0, common_1.Injectable)(),
    (0, class_validator_1.ValidatorConstraint)({ name: "LoginPassword", async: true }),
    __metadata("design:paramtypes", [users_shared_service_1.SharedUsersService])
], LoginPasswordValidator);
exports.LoginPasswordValidator = LoginPasswordValidator;
//# sourceMappingURL=login-password.validator.js.map