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
exports.AdminUsersService = void 0;
const common_1 = require("@nestjs/common");
const users_shared_service_1 = require("../../users/services/users-shared.service");
const admin_roles_1 = require("../entities/admin-roles");
const admin_user_repository_1 = require("../repositories/admin-user.repository");
let AdminUsersService = class AdminUsersService {
    constructor(repository, users) {
        this.repository = repository;
        this.users = users;
    }
    async getAllAdminUsers() {
        const admins = await this.repository.findAll();
        return admins.map((admin) => {
            const user = admin.user;
            delete admin.user;
            return Object.assign(Object.assign({}, admin), { username: user.username, email: user.email });
        });
    }
    addRootAdmin(input) {
        return this.addAdmin(Object.assign(Object.assign({}, input), { role: admin_roles_1.AdminUserRole.ROOT_ADMIN }));
    }
    addSuperAdmin(input) {
        return this.addAdmin(Object.assign(Object.assign({}, input), { role: admin_roles_1.AdminUserRole.SUPER_ADMIN }));
    }
    addRegularAdmin(input) {
        return this.addAdmin(Object.assign(Object.assign({}, input), { role: admin_roles_1.AdminUserRole.REGULAR_ADMIN }));
    }
    addSupportAdmin(input) {
        return this.addAdmin(Object.assign(Object.assign({}, input), { role: admin_roles_1.AdminUserRole.SUPPORT_ADMIN }));
    }
    async addAdmin(input) {
        const { user_id } = input;
        const isUserFound = await this.users.isUserFound(user_id);
        if (!isUserFound) {
            throw new Error("user does not exist!");
        }
        const existingAdmin = await this.getAdminUser(user_id);
        if (!existingAdmin) {
            await this.repository.insertOne(input);
        }
        else {
            await this.repository.updateRoleForUser(input);
        }
    }
    removeAdmin(userId) {
        return this.repository.removeAdminUser(userId);
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
AdminUsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [admin_user_repository_1.AdminUserRepository,
        users_shared_service_1.SharedUsersService])
], AdminUsersService);
exports.AdminUsersService = AdminUsersService;
//# sourceMappingURL=admin-users.service.js.map