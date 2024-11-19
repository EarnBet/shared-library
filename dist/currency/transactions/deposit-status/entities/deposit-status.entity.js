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
exports.DepositStatus = void 0;
const typeorm_1 = require("typeorm");
let DepositStatus = class DepositStatus {
};
exports.DepositStatus = DepositStatus;
__decorate([
    (0, typeorm_1.Column)({ type: "int", nullable: false, primary: true }),
    __metadata("design:type", Number)
], DepositStatus.prototype, "transaction_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "int", nullable: false }),
    __metadata("design:type", Number)
], DepositStatus.prototype, "user_id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "decimal",
        nullable: false,
        precision: 40,
        scale: 20,
    }),
    __metadata("design:type", String)
], DepositStatus.prototype, "decimal_amount", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 10, nullable: false }),
    __metadata("design:type", String)
], DepositStatus.prototype, "currency_symbol", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "decimal", default: null, precision: 40, scale: 20 }),
    __metadata("design:type", String)
], DepositStatus.prototype, "usd_amount", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 100, nullable: false }),
    __metadata("design:type", String)
], DepositStatus.prototype, "transaction_hash", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "timestamp",
        nullable: false,
        default: () => "CURRENT_TIMESTAMP()",
    }),
    __metadata("design:type", Date)
], DepositStatus.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "datetime", default: null }),
    __metadata("design:type", Date)
], DepositStatus.prototype, "notified_as_pending_at", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "datetime", default: null }),
    __metadata("design:type", Date)
], DepositStatus.prototype, "confirmed_at", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "datetime", default: null }),
    __metadata("design:type", Date)
], DepositStatus.prototype, "credited_at", void 0);
exports.DepositStatus = DepositStatus = __decorate([
    (0, typeorm_1.Entity)({ name: "deposit_status" })
], DepositStatus);
//# sourceMappingURL=deposit-status.entity.js.map