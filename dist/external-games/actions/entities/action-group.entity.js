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
exports.ExternalGameActionGroup = void 0;
const typeorm_1 = require("typeorm");
let ExternalGameActionGroup = class ExternalGameActionGroup {
};
exports.ExternalGameActionGroup = ExternalGameActionGroup;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: "int" }),
    __metadata("design:type", Number)
], ExternalGameActionGroup.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "int", nullable: false }),
    __metadata("design:type", Number)
], ExternalGameActionGroup.prototype, "user_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 256, nullable: false }),
    __metadata("design:type", String)
], ExternalGameActionGroup.prototype, "username", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 256, nullable: false }),
    __metadata("design:type", String)
], ExternalGameActionGroup.prototype, "game_identifier", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({
        type: "datetime",
        nullable: false,
    }),
    __metadata("design:type", Date)
], ExternalGameActionGroup.prototype, "processed_at", void 0);
exports.ExternalGameActionGroup = ExternalGameActionGroup = __decorate([
    (0, typeorm_1.Entity)("external_game_action_group")
], ExternalGameActionGroup);
//# sourceMappingURL=action-group.entity.js.map