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
exports.DepositStatusRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const constants_1 = require("../../../../database/constants");
const typeorm_repository_base_1 = require("../../../../database/typeorm/typeorm-repository.base");
const typeorm_expressions_1 = require("../../../../database/typeorm/typeorm-expressions");
const deposit_status_entity_1 = require("../entities/deposit-status.entity");
let DepositStatusRepository = class DepositStatusRepository extends typeorm_repository_base_1.TypeOrmRepository {
    constructor(repository) {
        super(repository);
    }
    markDepositAsConfirmed(depositTransactionId) {
        return this.repository.update({ transaction_id: depositTransactionId, confirmed_at: (0, typeorm_2.IsNull)() }, {
            confirmed_at: () => "NOW()",
        });
    }
    markDepositAsCredited(depositTransactionId) {
        return this.repository.update({ transaction_id: depositTransactionId, credited_at: (0, typeorm_2.IsNull)() }, {
            credited_at: () => "NOW()",
        });
    }
    getAllPendingDeposits() {
        return this.find({ confirmed_at: (0, typeorm_2.IsNull)() });
    }
    getAllConfirmedUncreditedDeposits() {
        return this.find({ confirmed_at: (0, typeorm_expressions_1.IsNotNull)(), credited_at: (0, typeorm_2.IsNull)() });
    }
    getRecentDeposits(limit = 100) {
        return this.repository.find({
            order: { transaction_id: "DESC" },
            take: limit,
        });
    }
    getRecentDepositsForUser({ user_id, limit }) {
        if (limit == undefined) {
            limit = 100;
        }
        return this.repository.find({
            where: { user_id },
            order: { transaction_id: "DESC" },
            take: limit,
        });
    }
    getGrandTotalDepositsForUser(user_id) {
        return this.getSumOfDepositsForUser({ user_id });
    }
    getTotalDepositsForUserInThePastDay(user_id) {
        return this.getSumOfDepositsForUser({ user_id, timeLimitInHours: 24 });
    }
    getSumOfDepositsForUsers(user_ids, timeLimitInHours) {
        return this.repository
            .createQueryBuilder()
            .select(`SUM(usd_amount)`, `totalDeposits`)
            .addSelect("user_id")
            .where(Object.assign({ user_id: (0, typeorm_2.In)(user_ids), usd_amount: (0, typeorm_expressions_1.IsNotNull)(), credited_at: (0, typeorm_expressions_1.IsNotNull)() }, (timeLimitInHours !== undefined
            ? {
                credited_at: (0, typeorm_2.Raw)((alias) => `TIMESTAMPDIFF(HOUR,${alias},NOW()) <= ${timeLimitInHours}`),
            }
            : {})))
            .groupBy("user_id")
            .getRawMany();
    }
    async getSumOfDepositsForUser({ user_id, timeLimitInHours, }) {
        const { totalDeposits } = await this.repository
            .createQueryBuilder()
            .select(`SUM(usd_amount)`, `totalDeposits`)
            .where(Object.assign({ user_id, usd_amount: (0, typeorm_expressions_1.IsNotNull)(), credited_at: (0, typeorm_expressions_1.IsNotNull)() }, (timeLimitInHours !== undefined
            ? {
                credited_at: (0, typeorm_2.Raw)((alias) => `TIMESTAMPDIFF(HOUR,${alias},NOW()) <= ${timeLimitInHours}`),
            }
            : {})))
            .getRawOne();
        return totalDeposits || "0";
    }
    async getDepositSummaryForUser(user_id) {
        const rows = await this.repository.manager.query(`SELECT

        currency_symbol,
        sum(usd_amount) AS total_usd_amount
        
        FROM deposit_status
        
        WHERE
        
        user_id = ${user_id} AND
        credited_at IS NOT NULL
        
        GROUP BY currency_symbol
        ;`);
        return rows;
    }
    async getRecentDepositsSummaryForUser({ user_id, timeLimitInDays, }) {
        const rows = await this.repository.manager.query(`SELECT

        currency_symbol,
        sum(usd_amount) AS total_usd_amount
        
        FROM deposit_status
        
        WHERE
        
        user_id = ${user_id} AND
        TIMESTAMPDIFF(DAY,credited_at,NOW()) <= ${timeLimitInDays}
        
        GROUP BY currency_symbol
        ;`);
        return rows;
    }
};
exports.DepositStatusRepository = DepositStatusRepository;
exports.DepositStatusRepository = DepositStatusRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(deposit_status_entity_1.DepositStatus, constants_1.SharedDatabaseConnectionName.CURRENCY)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], DepositStatusRepository);
//# sourceMappingURL=deposit-status.repository.js.map