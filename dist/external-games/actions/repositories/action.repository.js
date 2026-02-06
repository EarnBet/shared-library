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
exports.ExternalGameActionRepository = void 0;
const typeorm_1 = require("@nestjs/typeorm");
const common_1 = require("@nestjs/common");
const typeorm_2 = require("typeorm");
const typeorm_repository_base_1 = require("../../../database/typeorm/typeorm-repository.base");
const action_entity_1 = require("../entities/action.entity");
const constants_1 = require("../entities/constants");
const constants_2 = require("../../../database/constants");
let ExternalGameActionRepository = class ExternalGameActionRepository extends typeorm_repository_base_1.TypeOrmRepository {
    constructor(repository) {
        super(repository);
    }
    async shouldActionBeProcessed(action_id) {
        const action = await this.repository.findOne({
            where: [{ action_id }, { original_action_id: action_id }],
        });
        return action ? false : true;
    }
    async getActionsByIds(actionIds) {
        return await this.find({ action_id: (0, typeorm_2.In)(actionIds) });
    }
    async markActionsAsRolledBack(actionIds) {
        return await this.repository.update({ action_id: (0, typeorm_2.In)(actionIds) }, { rolled_back_at: () => "NOW()" });
    }
    async getRecentActions() {
        return await this.repository.find({
            where: { type: (0, typeorm_2.Not)((0, typeorm_2.Equal)(constants_1.PlayRequestActionType.ROLLBACK)) },
            order: {
                id: "DESC",
            },
            skip: 0,
            take: 1000,
        });
    }
    getRecentActionsForUser(user_id) {
        return this.repository
            .createQueryBuilder("action")
            .innerJoinAndSelect("action.group", "group")
            .where("group.user_id = :user_id", { user_id })
            .andWhere("action.amount_decimal IS NOT NULL")
            .orderBy("action.id", "DESC")
            .limit(1000)
            .getMany();
    }
};
exports.ExternalGameActionRepository = ExternalGameActionRepository;
exports.ExternalGameActionRepository = ExternalGameActionRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(action_entity_1.ExternalGameAction, constants_2.SharedDatabaseConnectionName.SOFTSWISS)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ExternalGameActionRepository);
//# sourceMappingURL=action.repository.js.map