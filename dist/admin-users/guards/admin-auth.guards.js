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
exports.UseRootAdminGuard = UseRootAdminGuard;
exports.UseSuperAdminGuard = UseSuperAdminGuard;
exports.UseRegularAdminGuard = UseRegularAdminGuard;
exports.UseSupportManagerGuard = UseSupportManagerGuard;
exports.UseSupportStaffAdminGuard = UseSupportStaffAdminGuard;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("../../auth/services/auth.service");
const auth_guard_1 = require("../../auth/guards/auth.guard");
const admin_users_shared_service_1 = require("../services/admin-users.shared.service");
const application_errors_1 = require("../../http/exception/application-errors");
const admin_roles_1 = require("../entities/admin-roles");
class AdminAuthGuard extends auth_guard_1.AuthGuard {
    constructor(authService, service, role) {
        super(authService);
        this.service = service;
        this.role = role;
    }
    async canActivate(context) {
        const isAuthenticated = await super.canActivate(context);
        const error = new application_errors_1.UnauthorizedError();
        if (!isAuthenticated) {
            throw error;
        }
        const request = context.switchToHttp().getRequest();
        const { authorizedUserData } = request;
        const { user_id } = authorizedUserData;
        const isAuthorized = await this.service.isAdminUserWithRole({
            user_id,
            role: this.role,
        });
        if (!isAuthorized) {
            throw error;
        }
        return true;
    }
}
let RootAdminAuthGuard = class RootAdminAuthGuard extends AdminAuthGuard {
    constructor(authService, service) {
        super(authService, service, admin_roles_1.AdminUserRole.ROOT_ADMIN);
    }
};
RootAdminAuthGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [auth_service_1.AuthService, admin_users_shared_service_1.SharedAdminUsersService])
], RootAdminAuthGuard);
let SuperAdminAuthGuard = class SuperAdminAuthGuard extends AdminAuthGuard {
    constructor(authService, service) {
        super(authService, service, admin_roles_1.AdminUserRole.SUPER_ADMIN);
    }
};
SuperAdminAuthGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [auth_service_1.AuthService, admin_users_shared_service_1.SharedAdminUsersService])
], SuperAdminAuthGuard);
let RegularAdminAuthGuard = class RegularAdminAuthGuard extends AdminAuthGuard {
    constructor(authService, service) {
        super(authService, service, admin_roles_1.AdminUserRole.REGULAR_ADMIN);
    }
};
RegularAdminAuthGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [auth_service_1.AuthService, admin_users_shared_service_1.SharedAdminUsersService])
], RegularAdminAuthGuard);
let SupportManagerAuthGuard = class SupportManagerAuthGuard extends AdminAuthGuard {
    constructor(authService, service) {
        super(authService, service, admin_roles_1.AdminUserRole.SUPPORT_MANAGER);
    }
};
SupportManagerAuthGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [auth_service_1.AuthService, admin_users_shared_service_1.SharedAdminUsersService])
], SupportManagerAuthGuard);
let SupportStaffAdminAuthGuard = class SupportStaffAdminAuthGuard extends AdminAuthGuard {
    constructor(authService, service) {
        super(authService, service, admin_roles_1.AdminUserRole.SUPPORT_STAFF);
    }
};
SupportStaffAdminAuthGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [auth_service_1.AuthService, admin_users_shared_service_1.SharedAdminUsersService])
], SupportStaffAdminAuthGuard);
function UseRootAdminGuard() {
    return (0, common_1.UseGuards)(RootAdminAuthGuard);
}
function UseSuperAdminGuard() {
    return (0, common_1.UseGuards)(SuperAdminAuthGuard);
}
function UseRegularAdminGuard() {
    return (0, common_1.UseGuards)(RegularAdminAuthGuard);
}
function UseSupportManagerGuard() {
    return (0, common_1.UseGuards)(SupportManagerAuthGuard);
}
function UseSupportStaffAdminGuard() {
    return (0, common_1.UseGuards)(SupportStaffAdminAuthGuard);
}
//# sourceMappingURL=admin-auth.guards.js.map