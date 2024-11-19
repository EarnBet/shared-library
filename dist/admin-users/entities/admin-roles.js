"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ALL_ADMIN_USER_ROLES = exports.AdminUserRole = void 0;
var AdminUserRole;
(function (AdminUserRole) {
    AdminUserRole[AdminUserRole["ROOT_ADMIN"] = 0] = "ROOT_ADMIN";
    AdminUserRole[AdminUserRole["SUPER_ADMIN"] = 1] = "SUPER_ADMIN";
    AdminUserRole[AdminUserRole["REGULAR_ADMIN"] = 2] = "REGULAR_ADMIN";
    AdminUserRole[AdminUserRole["SUPPORT_ADMIN"] = 3] = "SUPPORT_ADMIN";
})(AdminUserRole || (exports.AdminUserRole = AdminUserRole = {}));
exports.ALL_ADMIN_USER_ROLES = [
    AdminUserRole.ROOT_ADMIN,
    AdminUserRole.SUPER_ADMIN,
    AdminUserRole.REGULAR_ADMIN,
    AdminUserRole.SUPPORT_ADMIN,
];
//# sourceMappingURL=admin-roles.js.map