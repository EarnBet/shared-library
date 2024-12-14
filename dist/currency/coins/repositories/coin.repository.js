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
exports.CoinRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const coins_1 = require("./../coins");
const coin_entity_1 = require("../entities/coin.entity");
const constants_1 = require("../../../database/constants");
let CoinRepository = class CoinRepository {
    constructor(repository) {
        this.repository = repository;
    }
    async createCoins() {
        await this.repository.clear();
        return this.repository.insert([
            {
                id: -1,
                symbol: "USD",
                precision: 2,
                uses_memo_for_deposits: 0,
                minimum_withdrawal_amount: "0",
            },
            {
                id: coins_1.CoinId.BTC,
                symbol: "BTC",
                precision: 8,
                uses_memo_for_deposits: 0,
                minimum_withdrawal_amount: "0.0001000000",
            },
            {
                id: coins_1.CoinId.ETH,
                symbol: "ETH",
                precision: 8,
                uses_memo_for_deposits: 0,
                minimum_withdrawal_amount: "0.0050000000",
            },
            {
                id: coins_1.CoinId.EOS,
                symbol: "EOS",
                precision: 4,
                uses_memo_for_deposits: 1,
                minimum_withdrawal_amount: "0.5",
            },
            {
                id: coins_1.CoinId.BET_BINANCE,
                symbol: "BET",
                precision: 4,
                uses_memo_for_deposits: 1,
                minimum_withdrawal_amount: "100",
            },
            {
                id: coins_1.CoinId.USDT,
                symbol: "USDT",
                precision: 6,
                uses_memo_for_deposits: 0,
                minimum_withdrawal_amount: "10",
            },
            {
                id: coins_1.CoinId.EBET,
                symbol: "EBET",
                precision: 8,
                uses_memo_for_deposits: 0,
                minimum_withdrawal_amount: "100",
            },
        ]);
    }
    getAllCoins() {
        return this.repository.find();
    }
};
exports.CoinRepository = CoinRepository;
exports.CoinRepository = CoinRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(coin_entity_1.Coin, constants_1.SharedDatabaseConnectionName.CURRENCY)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], CoinRepository);
//# sourceMappingURL=coin.repository.js.map