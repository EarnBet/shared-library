"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SharedCoinsModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const db_connections_module_1 = require("../../database/db-connections.module");
const constants_1 = require("../../database/constants");
const coins_controller_1 = require("./controllers/coins.controller");
const coin_entity_1 = require("./entities/coin.entity");
const coin_repository_1 = require("./repositories/coin.repository");
const coins_service_1 = require("./services/coins.service");
const coin_data_provider_1 = require("./services/coin-data-provider");
let SharedCoinsModule = class SharedCoinsModule {
};
exports.SharedCoinsModule = SharedCoinsModule;
exports.SharedCoinsModule = SharedCoinsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            db_connections_module_1.SharedDatabaseConnectionsModule,
            typeorm_1.TypeOrmModule.forFeature([coin_entity_1.Coin], constants_1.SharedDatabaseConnectionName.CURRENCY),
        ],
        providers: [coins_service_1.CoinsService, coin_data_provider_1.CoinDataProvider, coin_repository_1.CoinRepository],
        controllers: [coins_controller_1.CoinsController],
        exports: [coin_data_provider_1.CoinDataProvider, db_connections_module_1.SharedDatabaseConnectionsModule],
    })
], SharedCoinsModule);
//# sourceMappingURL=coins.module.js.map