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
exports.ExternalGameAction = void 0;
const typeorm_1 = require("typeorm");
const action_group_entity_1 = require("./action-group.entity");
let ExternalGameAction = class ExternalGameAction {
};
exports.ExternalGameAction = ExternalGameAction;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: "int" }),
    __metadata("design:type", Number)
], ExternalGameAction.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "int", nullable: false }),
    __metadata("design:type", Number)
], ExternalGameAction.prototype, "action_group_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "int", unsigned: true, nullable: true }),
    __metadata("design:type", Number)
], ExternalGameAction.prototype, "user_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 256, nullable: false, unique: true }),
    __metadata("design:type", String)
], ExternalGameAction.prototype, "action_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 100, nullable: false }),
    __metadata("design:type", String)
], ExternalGameAction.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 10, nullable: false }),
    __metadata("design:type", String)
], ExternalGameAction.prototype, "currency_symbol", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "amount", type: "bigint", nullable: true }),
    __metadata("design:type", String)
], ExternalGameAction.prototype, "amount_integer", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "decimal", precision: 40, scale: 20, nullable: true }),
    __metadata("design:type", String)
], ExternalGameAction.prototype, "amount_decimal", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "int", default: 0 }),
    __metadata("design:type", String)
], ExternalGameAction.prototype, "jackpot_contribution", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "int", default: 0 }),
    __metadata("design:type", String)
], ExternalGameAction.prototype, "jackpot_win", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 256, nullable: true }),
    __metadata("design:type", String)
], ExternalGameAction.prototype, "original_action_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "datetime", nullable: true }),
    __metadata("design:type", Date)
], ExternalGameAction.prototype, "rolled_back_at", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => action_group_entity_1.ExternalGameActionGroup, {
        eager: true,
        createForeignKeyConstraints: false,
    }),
    (0, typeorm_1.JoinColumn)({ name: "action_group_id" }),
    __metadata("design:type", action_group_entity_1.ExternalGameActionGroup)
], ExternalGameAction.prototype, "group", void 0);
exports.ExternalGameAction = ExternalGameAction = __decorate([
    (0, typeorm_1.Entity)("external_game_action")
], ExternalGameAction);
//# sourceMappingURL=action.entity.js.map