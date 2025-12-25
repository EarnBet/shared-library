"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const big_js_1 = __importDefault(require("big.js"));
const precise_numbers_1 = require("../../../math/precise-numbers");
const shared_1 = require("./shared");
const constants_1 = require("./constants");
class PreciseCurrencyAmountFactory {
    constructor(currency) {
        this.currency = currency;
        this.validator = new shared_1.MatchingCurrencyValidator(currency);
    }
    newAmountFromInteger(integer, precision) {
        const number = new shared_1.PreciseCurrencyAmount(new big_js_1.default(integer).div(Math.pow(10, precision)), this.currency);
        this.validator.isMatchingType(number);
        return number;
    }
    newAmountFromDecimal(decimal, precision) {
        const number = new shared_1.PreciseCurrencyAmount(decimal, this.currency);
        this.validator.isMatchingType(number);
        return number;
    }
}
class CurrencyAmount extends precise_numbers_1.NumberForPreciseMathBase {
    constructor(decimalValue, currency) {
        const precision = constants_1.maxPrecisionForCurrencyAmounts;
        super(precision, new big_js_1.default(decimalValue)
            .times(Math.pow(10, precision))
            .round(0, big_js_1.default.roundDown), new PreciseCurrencyAmountFactory(currency));
        this.currency = currency;
    }
    get quantity() {
        return this.number.quantity;
    }
    get integerForBlockChain() {
        return this.number.integerForBlockChain;
    }
    get quantityForBlockChain() {
        return this.number.quantityForBlockChain;
    }
}
class CurrencyAmountFactory {
    constructor(coinDataProvider) {
        this.coinDataProvider = coinDataProvider;
    }
    async newAmountFromQuantity(quantity) {
        const [amount, tokenSymbol] = quantity.split(" ");
        return this.newAmountFromDecimal(amount, tokenSymbol);
    }
    async newAmountFromDecimal(decimalAmount, tokenSymbol) {
        const data = await this.coinDataProvider.getCoinDataBySymbol(tokenSymbol);
        return new CurrencyAmount(decimalAmount, data);
    }
    async newAmountFromDecimalAndCoinId(decimalAmount, coinId) {
        const data = await this.coinDataProvider.getCoinData(coinId);
        return new CurrencyAmount(decimalAmount, data);
    }
    async newAmountFromInteger(integerSubunits, tokenSymbol) {
        const data = await this.coinDataProvider.getCoinDataBySymbol(tokenSymbol);
        const decimalAmount = new big_js_1.default(integerSubunits).div(Math.pow(10, constants_1.maxPrecisionForCurrencyAmounts));
        return new CurrencyAmount(decimalAmount, data);
    }
}
//# sourceMappingURL=currency-amount.factory.js.map