"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var DepositStatusModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DepositStatusModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const db_connections_module_1 = require("../../../database/db-connections.module");
const constants_1 = require("../../../database/constants");
const deposit_status_entity_1 = require("./entities/deposit-status.entity");
const deposit_status_repository_1 = require("./repositories/deposit-status.repository");
const deposit_status_service_1 = require("./services/deposit-status.service");
let DepositStatusModule = DepositStatusModule_1 = class DepositStatusModule {
    static _forRoot(envFileRelativePath = ".env") {
        return {
            module: DepositStatusModule_1,
            imports: [
                typeorm_1.TypeOrmModule.forFeature([deposit_status_entity_1.DepositStatus], constants_1.SharedDatabaseConnectionName.CURRENCY),
            ],
            providers: [deposit_status_service_1.DepositStatusService, deposit_status_repository_1.DepositStatusRepository],
            exports: [deposit_status_service_1.DepositStatusService],
        };
    }
};
DepositStatusModule = DepositStatusModule_1 = __decorate([
    (0, common_1.Module)({
        imports: [
            db_connections_module_1.SharedDatabaseConnectionsModule,
            typeorm_1.TypeOrmModule.forFeature([deposit_status_entity_1.DepositStatus], constants_1.SharedDatabaseConnectionName.CURRENCY),
        ],
        providers: [deposit_status_service_1.DepositStatusService, deposit_status_repository_1.DepositStatusRepository],
        exports: [deposit_status_service_1.DepositStatusService],
    })
], DepositStatusModule);
exports.DepositStatusModule = DepositStatusModule;
//# sourceMappingURL=deposit-status.module.js.map