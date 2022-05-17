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
        return this.repository.update(depositTransactionId, {
            confirmed_at: () => "NOW()",
        });
    }
    markDepositAsCredited(depositTransactionId) {
        return this.repository.update(depositTransactionId, {
            credited_at: () => "NOW()",
        });
    }
    getAllPendingDeposits() {
        return this.find({ confirmed_at: (0, typeorm_2.IsNull)() });
    }
    getAllConfirmedUncreditedDeposits() {
        return this.find({ confirmed_at: (0, typeorm_expressions_1.IsNotNull)(), credited_at: (0, typeorm_2.IsNull)() });
    }
};
DepositStatusRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(deposit_status_entity_1.DepositStatus, constants_1.SharedDatabaseConnectionName.CURRENCY)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], DepositStatusRepository);
exports.DepositStatusRepository = DepositStatusRepository;
//# sourceMappingURL=deposit-status.repository.js.map