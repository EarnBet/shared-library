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
exports.CoinDataProvider = void 0;
const common_1 = require("@nestjs/common");
const timer_util_1 = require("../../../util/timer-util");
const saved_coin_1 = require("../models/saved-coin");
const coins_service_1 = require("./coins.service");
let CoinDataProvider = class CoinDataProvider {
    constructor(database) {
        this.database = database;
        this.isInit = false;
        this.ids = {};
        this.data = {};
        this.allCoins = [];
        this.init();
    }
    async init() {
        this.allCoins = (await this.database.getAllCoins()).map((row) => new saved_coin_1.SavedCoin(row));
        for (const row of this.allCoins) {
            this.ids[row.symbol] = row.id;
            this.data[row.id] = row;
        }
        this.isInit = true;
    }
    async getCoinDataBySymbol(symbol) {
        await this.waitForInit();
        const id = await this.getCoinId(symbol);
        return this.getCoinData(id);
    }
    async getCoinId(symbol) {
        await this.waitForInit();
        symbol = symbol.toUpperCase();
        const id = this.ids[symbol];
        if (id === undefined) {
            throw new Error("CoinId NOT FOUND: " + symbol);
        }
        return id;
    }
    async getCoinSymbol(coinId) {
        await this.waitForInit();
        const data = await this.getCoinData(coinId);
        return data.symbol;
    }
    async getCoinData(coinId) {
        await this.waitForInit();
        const data = this.data[coinId];
        if (!data) {
            throw new Error("Coin NOT FOUND: " + coinId);
        }
        return data;
    }
    async getAllCoins() {
        await this.waitForInit();
        return this.allCoins.slice();
    }
    async waitForInit() {
        while (!this.isInit) {
            await (0, timer_util_1.sleep)(10);
        }
    }
};
CoinDataProvider = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [coins_service_1.CoinsService])
], CoinDataProvider);
exports.CoinDataProvider = CoinDataProvider;
//# sourceMappingURL=coin-data-provider.js.map