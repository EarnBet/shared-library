"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WithdrawalRequestsRepositoryModule = void 0;
const typeorm_1 = require("@nestjs/typeorm");
const common_1 = require("@nestjs/common");
const user_entity_1 = require("../../../users/entities/user.entity");
const constants_1 = require("../../../database/constants");
const earnbet_connection_module_1 = require("../../../database/earnbet-connection.module");
const withdrawal_request_entity_1 = require("./entities/withdrawal-request.entity");
const withdrawal_requests_repository_1 = require("./repositories/withdrawal-requests.repository");
let WithdrawalRequestsRepositoryModule = class WithdrawalRequestsRepositoryModule {
};
exports.WithdrawalRequestsRepositoryModule = WithdrawalRequestsRepositoryModule;
exports.WithdrawalRequestsRepositoryModule = WithdrawalRequestsRepositoryModule = __decorate([
    (0, common_1.Module)({
        imports: [
            earnbet_connection_module_1.EarnbetDatabaseConnectionModule,
            typeorm_1.TypeOrmModule.forFeature([withdrawal_request_entity_1.WithdrawalRequest, user_entity_1.User], constants_1.SharedDatabaseConnectionName.EARNBET),
        ],
        providers: [withdrawal_requests_repository_1.WithdrawalRequestsRepository],
        exports: [withdrawal_requests_repository_1.WithdrawalRequestsRepository],
    })
], WithdrawalRequestsRepositoryModule);
//# sourceMappingURL=withdrawal-requests-repository.module.js.map