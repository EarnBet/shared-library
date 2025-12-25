"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PreciseCurrencyAmount = exports.MatchingCurrencyValidator = void 0;
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
    }
    get quantity() {
        return this.decimal + " " + this.currency.symbol;
    }
}
exports.PreciseCurrencyAmount = PreciseCurrencyAmount;
//# sourceMappingURL=shared.js.map