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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminUsersController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const google_recaptcha_1 = require("@nestlab/google-recaptcha");
const core_1 = require("@nestjs/core");
const auth_decorators_1 = require("../../auth/decorators/auth.decorators");
const admin_auth_guards_1 = require("../guards/admin-auth.guards");
const add_admin_input_1 = require("../inputs/add-admin.input");
const remove_admin_input_1 = require("../inputs/remove-admin.input");
const admin_users_service_1 = require("../services/admin-users.service");
const functions_1 = require("../../http/request/functions");
const admin_login_input_1 = require("../inputs/admin-login.input");
let AdminUsersController = class AdminUsersController {
    constructor(service, request) {
        this.service = service;
        this.request = request;
    }
    async login(input) {
        const data = await this.service.users.login(Object.assign(Object.assign({}, input), { ip: (0, functions_1.getIpAddress)(this.request) }));
        return Object.assign(Object.assign({}, data), { role: input.adminUser.role });
    }
    addSuperAdmin(input) {
        return this.service.addSuperAdmin({
            user_id: input.admin_user_id,
            added_by_user_id: input.user_id,
        });
    }
    addRegularAdmin(input) {
        return this.service.addRegularAdmin({
            user_id: input.admin_user_id,
            added_by_user_id: input.user_id,
        });
    }
    addRootAdmin(input) {
        return this.service.addRootAdmin({
            user_id: input.admin_user_id,
            added_by_user_id: input.user_id,
        });
    }
    listAdminUsers() {
        return this.service.getAllAdminUsers();
    }
    removeAdmin(input) {
        return this.service.removeAdmin(input.admin_user_id);
    }
};
__decorate([
    (0, google_recaptcha_1.Recaptcha)({ action: "login" }),
    (0, common_1.Post)("login"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [admin_login_input_1.AdminLoginInput]),
    __metadata("design:returntype", Promise)
], AdminUsersController.prototype, "login", null);
__decorate([
    (0, swagger_1.ApiHeader)({ name: "Authorization", required: true }),
    (0, admin_auth_guards_1.UseRootAdminGuard)(),
    (0, common_1.Post)("add-super-admin"),
    __param(0, (0, auth_decorators_1.BodyWithUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [add_admin_input_1.AddAdminUserInput]),
    __metadata("design:returntype", void 0)
], AdminUsersController.prototype, "addSuperAdmin", null);
__decorate([
    (0, admin_auth_guards_1.UseSuperAdminGuard)(),
    (0, common_1.Post)("add-regular-admin"),
    __param(0, (0, auth_decorators_1.BodyWithUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [add_admin_input_1.AddAdminUserInput]),
    __metadata("design:returntype", void 0)
], AdminUsersController.prototype, "addRegularAdmin", null);
__decorate([
    (0, admin_auth_guards_1.UseRootAdminGuard)(),
    (0, common_1.Post)("add-root-admin"),
    __param(0, (0, auth_decorators_1.BodyWithUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [add_admin_input_1.AddAdminUserInput]),
    __metadata("design:returntype", void 0)
], AdminUsersController.prototype, "addRootAdmin", null);
__decorate([
    (0, admin_auth_guards_1.UseSuperAdminGuard)(),
    (0, common_1.Get)(""),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AdminUsersController.prototype, "listAdminUsers", null);
__decorate([
    (0, admin_auth_guards_1.UseSuperAdminGuard)(),
    (0, common_1.Post)("remove-admin"),
    __param(0, (0, auth_decorators_1.BodyWithUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [remove_admin_input_1.RemoveAdminUserInput]),
    __metadata("design:returntype", void 0)
], AdminUsersController.prototype, "removeAdmin", null);
AdminUsersController = __decorate([
    (0, swagger_1.ApiTags)("Admin Users"),
    (0, common_1.Controller)("admin-users"),
    __param(1, (0, common_1.Inject)(core_1.REQUEST)),
    __metadata("design:paramtypes", [admin_users_service_1.AdminUsersService, Object])
], AdminUsersController);
exports.AdminUsersController = AdminUsersController;
//# sourceMappingURL=admin-users.controller.js.map