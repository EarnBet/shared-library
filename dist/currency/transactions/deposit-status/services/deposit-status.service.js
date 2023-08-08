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
exports.DepositStatusService = void 0;
const common_1 = require("@nestjs/common");
const deposit_status_repository_1 = require("../repositories/deposit-status.repository");
let DepositStatusService = class DepositStatusService {
    constructor(repository) {
        this.repository = repository;
    }
    addNewDeposit(data) {
        return this.repository.insertOne(data);
    }
    markDepositAsConfirmed(depositTransactionId) {
        return this.repository.markDepositAsConfirmed(depositTransactionId);
    }
    markDepositAsCredited(depositTransactionId) {
        return this.repository.markDepositAsCredited(depositTransactionId);
    }
    getSavedDeposit(depositTransactionId) {
        return this.repository.findOneById(depositTransactionId);
    }
    getAllPendingDeposits() {
        return this.repository.getAllPendingDeposits();
    }
    getAllConfirmedUncreditedDeposits() {
        return this.repository.getAllConfirmedUncreditedDeposits();
    }
    getGrandTotalDepositsForUser(user_id) {
        return this.repository.getGrandTotalDepositsForUser(user_id);
    }
    getTotalDepositsForUserInThePastDay(user_id) {
        return this.repository.getTotalDepositsForUserInThePastDay(user_id);
    }
    getSumOfDepositsForUser(input) {
        return this.repository.getSumOfDepositsForUser(input);
    }
};
DepositStatusService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [deposit_status_repository_1.DepositStatusRepository])
], DepositStatusService);
exports.DepositStatusService = DepositStatusService;
//# sourceMappingURL=deposit-status.service.js.map