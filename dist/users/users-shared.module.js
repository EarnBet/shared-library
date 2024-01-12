"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SharedUsersModule = void 0;
const common_1 = require("@nestjs/common");
const users_database_module_1 = require("./users-database.module");
const users_shared_service_1 = require("./services/users-shared.service");
const login_password_validator_1 = require("./validators/login-password.validator");
let SharedUsersModule = class SharedUsersModule {
};
SharedUsersModule = __decorate([
    (0, common_1.Module)({
        imports: [users_database_module_1.UsersDatabaseModule],
        providers: [users_shared_service_1.SharedUsersService, login_password_validator_1.LoginPasswordValidator],
        exports: [users_shared_service_1.SharedUsersService, users_database_module_1.UsersDatabaseModule],
    })
], SharedUsersModule);
exports.SharedUsersModule = SharedUsersModule;
//# sourceMappingURL=users-shared.module.js.map