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
exports.Coin = void 0;
const typeorm_1 = require("typeorm");
let Coin = class Coin {
};
__decorate([
    (0, typeorm_1.PrimaryColumn)({ type: "int" }),
    __metadata("design:type", Number)
], Coin.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 10, nullable: false }),
    __metadata("design:type", String)
], Coin.prototype, "symbol", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "int", nullable: false }),
    __metadata("design:type", Number)
], Coin.prototype, "precision", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "tinyint", unsigned: true, nullable: false }),
    __metadata("design:type", Number)
], Coin.prototype, "uses_memo_for_deposits", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "decimal", nullable: false, precision: 40, scale: 20 }),
    __metadata("design:type", String)
], Coin.prototype, "minimum_withdrawal_amount", void 0);
Coin = __decorate([
    (0, typeorm_1.Entity)({ name: "coin" })
], Coin);
exports.Coin = Coin;
//# sourceMappingURL=coin.entity.js.map