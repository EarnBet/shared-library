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
exports.CurrencyAmountService = void 0;
const common_1 = require("@nestjs/common");
const shared_config_service_1 = require("../../../config/shared-config.service");
const coin_data_provider_1 = require("../../coins/services/coin-data-provider");
const currency_amount_with_price_factory_1 = require("../factories/currency-amount-with-price.factory");
const coin_price_service_mock_1 = require("../price-service/coin-price.service.mock");
let CurrencyAmountService = class CurrencyAmountService {
    constructor(coinDataProvider, sharedConfigService) {
        this.coinDataProvider = coinDataProvider;
        this.sharedConfigService = sharedConfigService;
    }
    createAmountFromDecimal(decimalAmount, tokenSymbol) {
        return this.getFactory().newAmountFromDecimal(decimalAmount, tokenSymbol);
    }
    createAmountFromInteger(subunits, tokenSymbol) {
        return this.getFactory().newAmountFromInteger(subunits, tokenSymbol);
    }
    createAmountFromQuantity(quantity) {
        return this.getFactory().newAmountFromQuantity(quantity);
    }
    async getAllCoinPrices() {
        const allCoins = await this.getAllCoins();
        const output = [];
        for (const coin of allCoins) {
            output.push({
                currency_symbol: coin.symbol,
                currency_precision: coin.precision,
                currency_price_usd: await this.getPriceInUSD(coin.symbol),
                supports_memo: coin.data.usesMemoForDeposits,
                minimum_withdrawal_amount: coin.data.minimumWithdrawalAmount,
            });
        }
        return output;
    }
    getAllCoins() {
        return this.getCoinDataProvider().getAllCoins();
    }
    getCoinDataProvider() {
        return this.getFactory().coinDataProvider;
    }
    getPriceInUSD(currencySymbol) {
        return this.getFactory().priceService.getPriceInUSD(currencySymbol);
    }
    subscribeToPriceUpdates(callback) {
        return this.getFactory().priceService.subscribe(callback);
    }
    getFactory() {
        if (!this.factory) {
            const shouldUseRealPriceService = this.sharedConfigService.shouldUseRealCurrencyPriceService();
            const updateInterval = this.sharedConfigService.coinPriceUpdateInterval();
            this.factory = (0, currency_amount_with_price_factory_1.getCurrencyAmountWithPriceFactory)(this.coinDataProvider, updateInterval, shouldUseRealPriceService ? undefined : coin_price_service_mock_1.mockCurrencyPriceService);
        }
        return this.factory;
    }
};
exports.CurrencyAmountService = CurrencyAmountService;
exports.CurrencyAmountService = CurrencyAmountService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [coin_data_provider_1.CoinDataProvider,
        shared_config_service_1.SharedConfigService])
], CurrencyAmountService);
//# sourceMappingURL=currency-amount.service.js.map