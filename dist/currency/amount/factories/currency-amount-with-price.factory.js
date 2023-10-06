"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCurrencyAmountWithPriceFactory = void 0;
const big_js_1 = require("big.js");
const precise_numbers_1 = require("../../../math/precise-numbers");
const shared_1 = require("./shared");
const coin_price_service_1 = require("../price-service/coin-price.service");
class PreciseCurrencyAmountWithPrice extends shared_1.PreciseCurrencyAmount {
    constructor(decimalValue, currency, priceInUSD) {
        super(decimalValue, currency);
        this.priceInUSD = priceInUSD;
    }
    get amountInUSD() {
        this.checkPrice();
        return new big_js_1.default(this.decimal)
            .times(this.priceInUSD)
            .round(6, big_js_1.default.roundDown)
            .toString();
    }
    checkPrice() {
        if (this.priceInUSD == undefined) {
            throw new Error("Price for Currency IS NOT DEFINED!");
        }
    }
}
class PreciseCurrencyAmountWithPriceFactory {
    constructor(currency, priceInUSD) {
        this.currency = currency;
        this.priceInUSD = priceInUSD;
        this.validator = new shared_1.MatchingCurrencyValidator(currency);
    }
    newAmountFromInteger(integer, precision) {
        const number = new PreciseCurrencyAmountWithPrice(new big_js_1.default(integer).div(Math.pow(10, precision)), this.currency, this.priceInUSD);
        this.validator.isMatchingType(number);
        return number;
    }
    newAmountFromDecimal(decimal, precision) {
        const number = new PreciseCurrencyAmountWithPrice(decimal, this.currency, this.priceInUSD);
        this.validator.isMatchingType(number);
        return number;
    }
}
class CurrencyAmountWithPrice extends precise_numbers_1.NumberForPreciseMathBase {
    constructor(decimalValue, currency, priceInUSD) {
        super(currency.precision, new big_js_1.default(decimalValue)
            .times(Math.pow(10, currency.precision))
            .round(0, big_js_1.default.roundDown), new PreciseCurrencyAmountWithPriceFactory(currency, priceInUSD));
        this.currency = currency;
    }
    get amountInUSD() {
        return this.number.amountInUSD;
    }
    get priceInUSD() {
        return this.number.priceInUSD;
    }
    get quantity() {
        return this.number.quantity;
    }
}
class CurrencyAmountWithPriceFactory {
    constructor(coinDataProvider, priceService) {
        this.coinDataProvider = coinDataProvider;
        this.priceService = priceService;
    }
    async newAmountFromQuantity(quantity) {
        const [amount, tokenSymbol] = quantity.split(" ");
        return this.newAmountFromDecimal(amount, tokenSymbol);
    }
    async newAmountFromDecimal(decimalAmount, tokenSymbol) {
        const data = await this.coinDataProvider.getCoinDataBySymbol(tokenSymbol);
        return new CurrencyAmountWithPrice(decimalAmount, data, await this.priceService.getPriceInUSD(data.symbol));
    }
    async newAmountFromDecimalAndCoinId(decimalAmount, coinId) {
        const data = await this.coinDataProvider.getCoinData(coinId);
        return new CurrencyAmountWithPrice(decimalAmount, data, await this.priceService.getPriceInUSD(data.symbol));
    }
    async newAmountFromInteger(integerSubunits, tokenSymbol) {
        const data = await this.coinDataProvider.getCoinDataBySymbol(tokenSymbol);
        const decimalAmount = new big_js_1.default(integerSubunits).div(Math.pow(10, data.precision));
        return new CurrencyAmountWithPrice(decimalAmount, data, await this.priceService.getPriceInUSD(data.symbol));
    }
}
let currencyAmountWithPriceFactory;
function getCurrencyAmountWithPriceFactory(coinDataProvider, priceService = undefined) {
    if (currencyAmountWithPriceFactory == undefined) {
        if (priceService == undefined) {
            priceService = (0, coin_price_service_1.getRealCoinPriceService)(coinDataProvider);
        }
        currencyAmountWithPriceFactory = new CurrencyAmountWithPriceFactory(coinDataProvider, priceService);
    }
    return currencyAmountWithPriceFactory;
}
exports.getCurrencyAmountWithPriceFactory = getCurrencyAmountWithPriceFactory;
//# sourceMappingURL=currency-amount-with-price.factory.js.map