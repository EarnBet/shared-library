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
exports.VipUser = exports.VipMode = void 0;
const typeorm_1 = require("typeorm");
var VipMode;
(function (VipMode) {
    VipMode[VipMode["ON"] = 1] = "ON";
    VipMode[VipMode["OFF"] = 2] = "OFF";
})(VipMode || (exports.VipMode = VipMode = {}));
let VipUser = class VipUser {
};
exports.VipUser = VipUser;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: "int" }),
    __metadata("design:type", Number)
], VipUser.prototype, "user_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "smallint", default: VipMode.ON }),
    __metadata("design:type", Number)
], VipUser.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], VipUser.prototype, "created_at", void 0);
exports.VipUser = VipUser = __decorate([
    (0, typeorm_1.Entity)({ name: "vip_user" })
], VipUser);
//# sourceMappingURL=vip-users.entity.js.map