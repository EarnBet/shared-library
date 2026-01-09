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
exports.WithdrawalRequest = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../../../../users/entities/user.entity");
const date_util_1 = require("../../../../database/date-util");
let WithdrawalRequest = class WithdrawalRequest {
};
exports.WithdrawalRequest = WithdrawalRequest;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: "int" }),
    __metadata("design:type", Number)
], WithdrawalRequest.prototype, "id", void 0);
__decorate([
    (0, date_util_1.DateTimeColumn)({
        type: "timestamp",
        nullable: false,
        default: () => "CURRENT_TIMESTAMP()",
    }),
    __metadata("design:type", Date)
], WithdrawalRequest.prototype, "requested_at", void 0);
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.Column)({ type: "int", unsigned: true, nullable: false }),
    __metadata("design:type", Number)
], WithdrawalRequest.prototype, "user_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 10, nullable: false }),
    __metadata("design:type", String)
], WithdrawalRequest.prototype, "currency_symbol", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "decimal", precision: 40, scale: 20, nullable: false }),
    __metadata("design:type", String)
], WithdrawalRequest.prototype, "decimal_amount", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "decimal", precision: 20, scale: 6, nullable: false }),
    __metadata("design:type", String)
], WithdrawalRequest.prototype, "usd_amount", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 100, nullable: false }),
    __metadata("design:type", String)
], WithdrawalRequest.prototype, "withdraw_address", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 100, nullable: false }),
    __metadata("design:type", String)
], WithdrawalRequest.prototype, "withdraw_memo", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "int", unsigned: true, nullable: false }),
    __metadata("design:type", Number)
], WithdrawalRequest.prototype, "confirmation_token_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "tinyint", unsigned: true, nullable: false, default: 1 }),
    __metadata("design:type", Number)
], WithdrawalRequest.prototype, "is_on_hold", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "datetime", nullable: true }),
    __metadata("design:type", Date)
], WithdrawalRequest.prototype, "confirmed_at", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "int", unsigned: true, nullable: true }),
    __metadata("design:type", Number)
], WithdrawalRequest.prototype, "confirmed_by_user_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "datetime", nullable: true }),
    __metadata("design:type", Date)
], WithdrawalRequest.prototype, "approved_at", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "int", unsigned: true, nullable: true }),
    __metadata("design:type", Number)
], WithdrawalRequest.prototype, "approved_by_user_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "datetime", nullable: true }),
    __metadata("design:type", Date)
], WithdrawalRequest.prototype, "reprocessed_at", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "int", unsigned: true, nullable: true }),
    __metadata("design:type", Number)
], WithdrawalRequest.prototype, "reprocessed_by_user_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "datetime", nullable: true }),
    __metadata("design:type", Date)
], WithdrawalRequest.prototype, "processed_at", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "datetime", nullable: true }),
    __metadata("design:type", Date)
], WithdrawalRequest.prototype, "insufficient_funds_at", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text", nullable: true }),
    __metadata("design:type", String)
], WithdrawalRequest.prototype, "error_message", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "datetime", nullable: true }),
    __metadata("design:type", Date)
], WithdrawalRequest.prototype, "cancelled_at", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "int", unsigned: true, nullable: true }),
    __metadata("design:type", Number)
], WithdrawalRequest.prototype, "cancelled_by_user_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "datetime", nullable: true }),
    __metadata("design:type", Date)
], WithdrawalRequest.prototype, "refunded_at", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "int", unsigned: true, nullable: true }),
    __metadata("design:type", Number)
], WithdrawalRequest.prototype, "refunded_by_user_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 100, nullable: true }),
    __metadata("design:type", String)
], WithdrawalRequest.prototype, "transaction_hash", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "int", unsigned: true, nullable: true }),
    __metadata("design:type", Number)
], WithdrawalRequest.prototype, "transaction_id", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => user_entity_1.User, { eager: true, createForeignKeyConstraints: false }),
    (0, typeorm_1.JoinColumn)({ name: "user_id" }),
    __metadata("design:type", user_entity_1.User)
], WithdrawalRequest.prototype, "user", void 0);
exports.WithdrawalRequest = WithdrawalRequest = __decorate([
    (0, typeorm_1.Entity)({ name: "withdrawal_request" })
], WithdrawalRequest);
//# sourceMappingURL=withdrawal-request.entity.js.map