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
exports.AdminUser = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../../users/entities/user.entity");
const admin_roles_1 = require("./admin-roles");
let AdminUser = class AdminUser {
};
__decorate([
    (0, typeorm_1.PrimaryColumn)({ type: "int" }),
    __metadata("design:type", Number)
], AdminUser.prototype, "user_id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "int",
        nullable: false,
        default: admin_roles_1.AdminUserRole.REGULAR_ADMIN,
    }),
    __metadata("design:type", Number)
], AdminUser.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "int", nullable: false }),
    __metadata("design:type", Number)
], AdminUser.prototype, "added_by_user_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "timestamp", default: () => "CURRENT_TIMESTAMP()" }),
    __metadata("design:type", Date)
], AdminUser.prototype, "added_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ type: "datetime", default: null }),
    __metadata("design:type", Date)
], AdminUser.prototype, "updated_at", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => user_entity_1.User, { eager: true, createForeignKeyConstraints: false }),
    (0, typeorm_1.JoinColumn)({ name: "user_id" }),
    __metadata("design:type", user_entity_1.User)
], AdminUser.prototype, "user", void 0);
AdminUser = __decorate([
    (0, typeorm_1.Entity)({ name: "admin_user" })
], AdminUser);
exports.AdminUser = AdminUser;
//# sourceMappingURL=admin-user.entity.js.map