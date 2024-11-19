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
exports.SharedAdminUsersService = void 0;
const common_1 = require("@nestjs/common");
const users_shared_service_1 = require("../../users/services/users-shared.service");
const admin_roles_1 = require("../entities/admin-roles");
const admin_user_shared_repository_1 = require("../repositories/admin-user.shared.repository");
let SharedAdminUsersService = class SharedAdminUsersService {
    constructor(repository, users) {
        this.repository = repository;
        this.users = users;
    }
    isRootAdmin(userId) {
        return this.isAdminUserWithRole({
            user_id: userId,
            role: admin_roles_1.AdminUserRole.ROOT_ADMIN,
        });
    }
    isSuperAdmin(userId) {
        return this.isAdminUserWithRole({
            user_id: userId,
            role: admin_roles_1.AdminUserRole.SUPER_ADMIN,
        });
    }
    isRegularAdmin(userId) {
        return this.isAdminUserWithRole({
            user_id: userId,
            role: admin_roles_1.AdminUserRole.REGULAR_ADMIN,
        });
    }
    async isAdminUserWithRole({ user_id, role, }) {
        const admin = await this.getAdminUser(user_id);
        return admin && admin.role <= role;
    }
    getAdminUser(userId) {
        return this.repository.findOneById(userId);
    }
};
exports.SharedAdminUsersService = SharedAdminUsersService;
exports.SharedAdminUsersService = SharedAdminUsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [admin_user_shared_repository_1.SharedAdminUserRepository,
        users_shared_service_1.SharedUsersService])
], SharedAdminUsersService);
//# sourceMappingURL=admin-users.shared.service.js.map