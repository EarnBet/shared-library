"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRealCoinPriceService = void 0;
const timer_util_1 = require("../../../util/timer-util");
const http_util_1 = require("../../../util/http-util");
class CoinPriceService {
    constructor(database) {
        this.symbols = [];
        this.prices = {};
        this.isInit = false;
        this.updateCoinPrices = async () => {
            for (let symbol of this.symbols) {
                symbol = symbol.split("_")[0];
                const price = await fetchPriceOfCoin(symbol);
                if (price != undefined) {
                    this.prices[symbol] = price;
                }
            }
        };
        this.init(database);
    }
    async init(database) {
        const coins = await database.getAllCoins();
        this.symbols = coins.map((row) => row.symbol);
        setInterval(this.updateCoinPrices, 1000 * 60 * 60);
        await this.updateCoinPrices();
        console.log("CoinPriceService initialized: ", this.prices);
        this.isInit = true;
    }
    async getPriceInUSD(symbol) {
        await this.waitForInit();
        symbol = symbol.split("_")[0];
        if (symbol == "FUN") {
            return 0;
        }
        if (symbol == "USD") {
            return 1;
        }
        const price = this.prices[symbol.toUpperCase()];
        if (price == undefined) {
            console.log({ prices: this.prices });
            throw new Error(symbol + " Price is UNDEFINED!");
        }
        return price;
    }
    async waitForInit() {
        while (!this.isInit) {
            await (0, timer_util_1.sleep)(10);
        }
    }
}
async function fetchPriceOfCoin(symbol) {
    const priceServerHost = process.env.CURRENCY_PRICE_SERVER_HOST || "internal.eosbet.io";
    const url = priceServerHost + "/token_price/" + symbol.toUpperCase();
    try {
        const data = await (0, http_util_1.httpGetJson)(url);
        return Number(data.price);
    }
    catch (error) {
        console.error(error);
        return undefined;
    }
}
let coinPriceService;
function getRealCoinPriceService(database) {
    if (coinPriceService == undefined) {
        coinPriceService = new CoinPriceService(database);
    }
    return coinPriceService;
}
exports.getRealCoinPriceService = getRealCoinPriceService;
//# sourceMappingURL=coin-price.service.js.map