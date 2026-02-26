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
exports.WithdrawalRequestsRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const withdrawal_request_entity_1 = require("../entities/withdrawal-request.entity");
const constants_1 = require("../../../../database/constants");
const typeorm_repository_base_1 = require("../../../../database/typeorm/typeorm-repository.base");
const typeorm_expressions_1 = require("../../../../database/typeorm/typeorm-expressions");
let WithdrawalRequestsRepository = class WithdrawalRequestsRepository extends typeorm_repository_base_1.TypeOrmRepository {
    constructor(repository) {
        super(repository);
    }
    addNewRequest(input) {
        return this.insertOne(input);
    }
    findByTokenId(confirmation_token_id) {
        return this.findOne({ confirmation_token_id });
    }
    markAsConfirmed({ request_id, confirmed_by_user_id, shouldHold, }) {
        return this.repository.update({ id: request_id, confirmed_at: (0, typeorm_2.IsNull)(), cancelled_at: (0, typeorm_2.IsNull)() }, {
            confirmed_at: typeorm_expressions_1.NOW,
            confirmed_by_user_id,
            is_on_hold: shouldHold ? 1 : 0,
        });
    }
    getAllConfirmedRequestsOnHold() {
        return this.repository.findBy({ is_on_hold: 1, confirmed_at: (0, typeorm_expressions_1.IsNotNull)() });
    }
    approveRequest({ request_id, approved_by_user_id }) {
        return this.repository.update({
            id: request_id,
            confirmed_at: (0, typeorm_expressions_1.IsNotNull)(),
            is_on_hold: 1,
            cancelled_at: (0, typeorm_2.IsNull)(),
        }, { is_on_hold: 0, approved_at: typeorm_expressions_1.NOW, approved_by_user_id });
    }
    approveAllHeldRequestsForUser({ user_id, removed_by_user_id: approved_by_user_id, }) {
        return this.repository.update({ user_id, confirmed_at: (0, typeorm_expressions_1.IsNotNull)(), is_on_hold: 1 }, { is_on_hold: 0, approved_at: typeorm_expressions_1.NOW, approved_by_user_id });
    }
    getAllRequestsForProcessing() {
        return this.repository.findBy({
            confirmed_at: (0, typeorm_expressions_1.IsNotNull)(),
            is_on_hold: 0,
            processed_at: (0, typeorm_2.IsNull)(),
            cancelled_at: (0, typeorm_2.IsNull)(),
            refunded_at: (0, typeorm_2.IsNull)(),
        });
    }
    getTotalWithdrawalsForUsersInThePastDay(user_ids) {
        const timeLimitInHours = 24;
        return this.repository
            .createQueryBuilder()
            .select(`SUM(usd_amount)`, `totalWithdrawals`)
            .addSelect("user_id")
            .where({
            user_id: (0, typeorm_2.In)(user_ids),
            usd_amount: (0, typeorm_expressions_1.IsNotNull)(),
            requested_at: (0, typeorm_2.Raw)((alias) => `TIMESTAMPDIFF(HOUR,${alias},NOW()) <= ${timeLimitInHours}`),
        })
            .groupBy("user_id")
            .getRawMany();
    }
    async getTotalWithdrawalsForUserInThePastDay(user_id) {
        const timeLimitInHours = 24;
        const { total } = await this.repository
            .createQueryBuilder()
            .select(`SUM(usd_amount)`, `total`)
            .where({
            user_id,
            usd_amount: (0, typeorm_expressions_1.IsNotNull)(),
            requested_at: (0, typeorm_2.Raw)((alias) => `TIMESTAMPDIFF(HOUR,${alias},NOW()) <= ${timeLimitInHours}`),
        })
            .getRawOne();
        return total || "0";
    }
    markAsProcessed(requestId) {
        return this.repository.update({ id: requestId, processed_at: (0, typeorm_2.IsNull)() }, { processed_at: typeorm_expressions_1.NOW });
    }
    markAsInsufficientFunds(requestId) {
        return this.repository.update(requestId, {
            insufficient_funds_at: typeorm_expressions_1.NOW,
            processed_at: null,
        });
    }
    saveError(requestId, error_message) {
        return this.repository.update(requestId, {
            error_message,
            cancelled_at: typeorm_expressions_1.NOW,
        });
    }
    markAsCancelled(requestId) {
        return this.repository.update({
            id: requestId,
            processed_at: (0, typeorm_2.IsNull)(),
            cancelled_at: (0, typeorm_2.IsNull)(),
            refunded_at: (0, typeorm_2.IsNull)(),
            transaction_id: (0, typeorm_2.IsNull)(),
        }, { cancelled_at: typeorm_expressions_1.NOW });
    }
    markAsForceCancelledByAdmin({ requestId, cancelled_by_user_id, }) {
        return this.repository.update({
            id: requestId,
            cancelled_by_user_id: (0, typeorm_2.IsNull)(),
            refunded_at: (0, typeorm_2.IsNull)(),
            transaction_id: (0, typeorm_2.IsNull)(),
        }, {
            cancelled_at: typeorm_expressions_1.NOW,
            is_on_hold: 1,
            error_message: "cancelled by admin",
            cancelled_by_user_id,
        });
    }
    markAsRefunded({ request_id, refunded_by_user_id }) {
        return this.repository.update({
            id: request_id,
            cancelled_at: (0, typeorm_expressions_1.IsNotNull)(),
            refunded_at: (0, typeorm_2.IsNull)(),
            transaction_id: (0, typeorm_2.IsNull)(),
        }, {
            refunded_at: typeorm_expressions_1.NOW,
            refunded_by_user_id,
        });
    }
    markForReprocessing({ request_id, reprocessed_by_user_id, }) {
        return this.repository.update({
            id: request_id,
            cancelled_at: (0, typeorm_expressions_1.IsNotNull)(),
            refunded_at: (0, typeorm_2.IsNull)(),
            transaction_id: (0, typeorm_2.IsNull)(),
        }, {
            reprocessed_at: typeorm_expressions_1.NOW,
            reprocessed_by_user_id,
            processed_at: null,
            error_message: null,
            cancelled_at: null,
        });
    }
    saveTransactionId({ withdrawal_request_id, transaction_hash, transaction_id, }) {
        return this.repository.update(withdrawal_request_id, {
            transaction_hash,
            transaction_id,
        });
    }
    getAllHeldAndFailedRequests() {
        const commonCriteria = {
            refunded_at: (0, typeorm_2.IsNull)(),
            transaction_id: (0, typeorm_2.IsNull)(),
            cancelled_by_user_id: (0, typeorm_2.IsNull)(),
        };
        return this.repository.find({
            where: [
                Object.assign({ is_on_hold: 1, cancelled_at: (0, typeorm_2.IsNull)() }, commonCriteria),
                Object.assign({ confirmed_at: (0, typeorm_expressions_1.IsNotNull)(), is_on_hold: 0, processed_at: (0, typeorm_2.IsNull)() }, commonCriteria),
                Object.assign({ insufficient_funds_at: (0, typeorm_expressions_1.IsNotNull)(), cancelled_at: (0, typeorm_2.IsNull)() }, commonCriteria),
                Object.assign({ is_on_hold: 0, cancelled_at: (0, typeorm_expressions_1.IsNotNull)() }, commonCriteria),
            ],
        });
    }
    getRecentRequests(limit = 100) {
        return this.repository.find({ order: { id: "DESC" }, take: limit });
    }
    getRecentRequestsForUser({ user_id, limit }) {
        if (limit == undefined) {
            limit = 100;
        }
        return this.repository.find({
            where: { user_id },
            order: { id: "DESC" },
            take: limit,
        });
    }
    async getTotalWithdrawalsByUser() {
        const rows = await this.repository.manager.query(`SELECT

      user_id,
      currency_symbol,
      sum(decimal_amount) AS total_amount,
      sum(usd_amount) AS total_amount_usd
      
      FROM withdrawal_request
      
      WHERE
      currency_symbol != 'EBET' AND
      cancelled_at IS NULL AND
      refunded_at IS NULL
      
      GROUP BY user_id,currency_symbol
      
      ORDER BY total_amount_usd DESC`);
        return rows;
    }
};
exports.WithdrawalRequestsRepository = WithdrawalRequestsRepository;
exports.WithdrawalRequestsRepository = WithdrawalRequestsRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(withdrawal_request_entity_1.WithdrawalRequest, constants_1.SharedDatabaseConnectionName.EARNBET)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], WithdrawalRequestsRepository);
//# sourceMappingURL=withdrawal-requests.repository.js.map