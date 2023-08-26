"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRealCoinPriceService = void 0;
const http_util_1 = require("../../../util/http-util");
class CoinPriceService {
    constructor() {
        this.symbols = [];
        this.prices = {};
        this.updateCoinPrices = async () => {
            for (let symbol of this.symbols) {
                symbol = symbol.split("_")[0];
                const price = await fetchPriceOfCoin(symbol);
                if (price != undefined) {
                    this.prices[symbol] = price;
                }
            }
        };
    }
    async init(database) {
        const coins = await database.getAllCoins();
        this.symbols = coins.map((row) => row.symbol);
        setInterval(this.updateCoinPrices, 1000 * 60 * 60);
        await this.updateCoinPrices();
    }
    async getPriceInUSD(symbol) {
        symbol = symbol.split("_")[0];
        if (symbol == "FUN") {
            return 0;
        }
        if (symbol == "USD") {
            return 1;
        }
        const price = this.prices[symbol.toUpperCase()];
        if (price == undefined) {
            console.log(this.prices);
            throw new Error(symbol + " Price is UNDEFINED!");
        }
        return price;
    }
}
let coinPriceService;
async function getRealCoinPriceService(database) {
    if (coinPriceService == undefined) {
        coinPriceService = new CoinPriceService();
        await coinPriceService.init(database);
    }
    return coinPriceService;
}
exports.getRealCoinPriceService = getRealCoinPriceService;
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
//# sourceMappingURL=coin-price.service.js.map