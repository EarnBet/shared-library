"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRealCoinPriceService = getRealCoinPriceService;
const timer_util_1 = require("../../../util/timer-util");
const http_util_1 = require("../../../util/http-util");
const events_1 = require("events");
const events_enum_1 = require("../outputs/events.enum");
class CoinPriceService {
    constructor(database, updateInterval) {
        this.updateInterval = updateInterval;
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
            this.eventEmitter.emit(events_enum_1.CurrencyAmountEvent.COIN_PRICE_UPDATED, this.prices);
        };
        this.eventEmitter = new events_1.EventEmitter();
        this.init(database);
    }
    subscribe(subscriber) {
        this.eventEmitter.on(events_enum_1.CurrencyAmountEvent.COIN_PRICE_UPDATED, subscriber);
    }
    async init(database) {
        const coins = await database.getAllCoins();
        this.symbols = coins.map((row) => row.symbol);
        setInterval(this.updateCoinPrices, this.updateInterval);
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
function getRealCoinPriceService(database, updateInterval) {
    if (coinPriceService == undefined) {
        coinPriceService = new CoinPriceService(database, updateInterval);
    }
    return coinPriceService;
}
//# sourceMappingURL=coin-price.service.js.map