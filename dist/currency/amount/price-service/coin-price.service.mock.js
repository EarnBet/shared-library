"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MockCurrencyPriceService = void 0;
const PRICES = {
    BTC: 41897.46,
    ETH: 3155.55,
    EOS: 2.8,
    BET: 0.054894,
    LTC: 130.84,
    XRP: 0.754477,
    BCH: 377.32,
    BNB: 439.21,
    WAX: 0.421,
    TRX: 0.066462,
    LINK: 28.01,
    BET_ETH: 0.054894,
    DAI: 1,
    USDC: 1,
    USDT: 1,
    USDT_TRON: 1,
    STACK: 3.11,
    EBET: 0.00001,
    USD: 1,
    FUN: 0,
};
class MockCurrencyPriceService {
    constructor(updateInterval) {
        this.updateInterval = updateInterval;
    }
    async getPriceInUSD(currencySymbol) {
        return PRICES[currencySymbol];
    }
    subscribe(callback) {
        setInterval(() => {
            this.changePrices();
            callback(PRICES);
        }, this.updateInterval);
    }
    changePrices() {
        for (const symbol in PRICES) {
            if (symbol === "USD" || symbol === "FUN") {
                continue;
            }
            const minus = Math.random() > 0.5 ? -1 : 1;
            const rnd = Math.random();
            const limiter = PRICES[symbol] * 0.01;
            const change = Math.min(limiter, rnd);
            const proposed_price = PRICES[symbol] + change * minus;
            PRICES[symbol] = Math.max(0.0001, proposed_price);
        }
    }
}
exports.MockCurrencyPriceService = MockCurrencyPriceService;
//# sourceMappingURL=coin-price.service.mock.js.map