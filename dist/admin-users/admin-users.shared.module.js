"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SharedAdminUsersModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const users_shared_module_1 = require("../users/users-shared.module");
const constants_1 = require("../database/constants");
const auth_module_1 = require("../auth/auth.module");
const admin_user_entity_1 = require("./entities/admin-user.entity");
const admin_user_repository_1 = require("./repositories/admin-user.repository");
const admin_users_shared_service_1 = require("./services/admin-users.shared.service");
let SharedAdminUsersModule = class SharedAdminUsersModule {
};
SharedAdminUsersModule = __decorate([
    (0, common_1.Module)({
        imports: [
            auth_module_1.AuthModule,
            users_shared_module_1.SharedUsersModule,
            typeorm_1.TypeOrmModule.forFeature([admin_user_entity_1.AdminUser], constants_1.SharedDatabaseConnectionName.EARNBET),
        ],
        providers: [admin_user_repository_1.AdminUserRepository, admin_users_shared_service_1.SharedAdminUsersService],
        controllers: [],
        exports: [admin_users_shared_service_1.SharedAdminUsersService, users_shared_module_1.SharedUsersModule, auth_module_1.AuthModule],
    })
], SharedAdminUsersModule);
exports.SharedAdminUsersModule = SharedAdminUsersModule;
//# sourceMappingURL=admin-users.shared.module.js.map