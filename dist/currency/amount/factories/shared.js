"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PreciseCurrencyAmount = exports.MatchingCurrencyValidator = void 0;
const big_js_1 = __importDefault(require("big.js"));
const precise_numbers_1 = require("../../../math/precise-numbers");
const constants_1 = require("./constants");
class MatchingCurrencyValidator {
    constructor(currency) {
        this.currency = currency;
    }
    isMatchingType({ currency }) {
        if (this.currency.symbol != currency.symbol ||
            this.currency.precision != currency.precision) {
            throw new Error("both amounts must be the same currency!");
        }
        else {
            return true;
        }
    }
}
exports.MatchingCurrencyValidator = MatchingCurrencyValidator;
class PreciseCurrencyAmount extends precise_numbers_1.PreciseDecimal {
    constructor(decimalValue, currency) {
        super(decimalValue, constants_1.maxPrecisionForCurrencyAmounts);
        this.currency = currency;
        this.precisionForBlockChain = currency.precision;
    }
    get quantity() {
        return this.decimal + " " + this.currency.symbol;
    }
    get quantityForBlockChain() {
        return this.decimalForBlockChain + " " + this.currency.symbol;
    }
    get integerForBlockChain() {
        return new big_js_1.default(this.decimal)
            .times(Math.pow(10, this.precisionForBlockChain))
            .toFixed(0, big_js_1.default.roundDown);
    }
    get decimalForBlockChain() {
        return new big_js_1.default(this.decimal).toFixed(this.precisionForBlockChain, big_js_1.default.roundDown);
    }
}
exports.PreciseCurrencyAmount = PreciseCurrencyAmount;
//# sourceMappingURL=shared.js.map