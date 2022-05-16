"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DecimalForPreciseMath = exports.NumberForPreciseMath = exports.NumberForPreciseMathBase = exports.PreciseDecimal = exports.PreciseNumber = void 0;
const big_js_1 = require("big.js");
const precise_math_1 = require("./precise-math");
class PreciseNumber {
    constructor(precision, integerValue = 0) {
        this.precision = precision;
        this.factor = new big_js_1.Big(Math.pow(10, precision));
        this.bigInteger = new big_js_1.Big(integerValue);
        big_js_1.Big.RM = big_js_1.Big.roundDown;
        this.decimal = this.bigInteger.div(this.factor).toFixed(precision);
    }
    isLessThan(other) {
        this.validateMatchingCurrency(other);
        return this.bigInteger.lt(other.integer);
    }
    isLessThanDecimal(other) {
        return new big_js_1.Big(this.decimal).lt(other);
    }
    isGreaterThan(other) {
        this.validateMatchingCurrency(other);
        return this.bigInteger.gt(other.integer);
    }
    isGreaterThanOrEqualTo(other) {
        this.validateMatchingCurrency(other);
        return this.bigInteger.gte(other.integer);
    }
    isGreaterThanDecimal(other) {
        return new big_js_1.Big(this.decimal).gt(other);
    }
    isGreaterThanOrEqualToDecimal(other) {
        return new big_js_1.Big(this.decimal).gte(other);
    }
    isEqualTo(other) {
        this.validateMatchingCurrency(other);
        return this.bigInteger.eq(other.integer);
    }
    isEqualToDecimal(other) {
        return new big_js_1.Big(this.decimal).eq(other);
    }
    validateMatchingCurrency(other) {
        if (this.precision != other.precision) {
            throw new Error("both amounts must be the same precision!");
        }
    }
    get integer() {
        return this.bigInteger.toFixed(0);
    }
    get isZero() {
        return this.bigInteger.eq(0);
    }
    get isPositive() {
        return this.bigInteger.gt(0);
    }
    get isNegative() {
        return this.bigInteger.lt(0);
    }
}
exports.PreciseNumber = PreciseNumber;
class PreciseDecimal extends PreciseNumber {
    constructor(decimalValue, precision) {
        const factor = new big_js_1.Big(Math.pow(10, precision));
        const decimal = new big_js_1.Big(decimalValue);
        super(precision, decimal.times(factor).round(0, big_js_1.Big.roundDown));
    }
}
exports.PreciseDecimal = PreciseDecimal;
class MatchingPrecisionValidator {
    constructor(precision) {
        this.precision = precision;
    }
    isMatchingType(other) {
        if (this.precision != other.precision) {
            throw new Error("both amounts must be the same precision!");
        }
        else {
            return true;
        }
    }
}
class PreciseNumberFactory {
    constructor(precision) {
        this.validator = new MatchingPrecisionValidator(precision);
    }
    newAmountFromInteger(integer, precision) {
        const number = new PreciseNumber(precision, integer);
        this.validator.isMatchingType(number);
        return number;
    }
    newAmountFromDecimal(decimal, precision) {
        const number = new PreciseDecimal(decimal, precision);
        this.validator.isMatchingType(number);
        return number;
    }
}
class NumberForPreciseMathBase {
    constructor(precision, integerValue, factory) {
        this.factory = factory;
        const number = factory.newAmountFromInteger(integerValue, precision);
        this.math = new precise_math_1.PreciseMath(number, factory);
    }
    addDecimal(decimal) {
        return this.math.addDecimal(decimal);
    }
    add(amount) {
        return this.math.add(amount);
    }
    subtractDecimal(decimal) {
        return this.math.subtractDecimal(decimal);
    }
    subtract(amount) {
        return this.math.subtract(amount);
    }
    multiplyDecimal(decimal) {
        return this.math.multiplyDecimal(decimal);
    }
    divideDecimal(decimal) {
        return this.math.divideDecimal(decimal);
    }
    absoluteValue() {
        return this.math.absoluteValue();
    }
    isLessThan(other) {
        return this.number.isLessThan(other);
    }
    isLessThanDecimal(other) {
        return this.number.isLessThanDecimal(other);
    }
    isGreaterThan(other) {
        return this.number.isGreaterThan(other);
    }
    isGreaterThanOrEqualTo(other) {
        return this.number.isGreaterThanOrEqualTo(other);
    }
    isGreaterThanDecimal(other) {
        return this.number.isGreaterThanDecimal(other);
    }
    isGreaterThanOrEqualToDecimal(other) {
        return this.number.isGreaterThanOrEqualToDecimal(other);
    }
    isEqualTo(other) {
        return this.number.isEqualTo(other);
    }
    isEqualToDecimal(other) {
        return this.number.isEqualToDecimal(other);
    }
    get decimal() {
        return this.number.decimal;
    }
    get integer() {
        return this.number.integer;
    }
    get isZero() {
        return this.number.isZero;
    }
    get isPositive() {
        return this.number.isPositive;
    }
    get isNegative() {
        return this.number.isNegative;
    }
    get bigInteger() {
        return this.number.bigInteger;
    }
    get precision() {
        return this.number.precision;
    }
    get factor() {
        return this.number.factor;
    }
    get number() {
        return this.startingValue;
    }
    get startingValue() {
        return this.math.startingValue;
    }
}
exports.NumberForPreciseMathBase = NumberForPreciseMathBase;
class NumberForPreciseMath extends NumberForPreciseMathBase {
    constructor(precision, integerValue = 0) {
        super(precision, integerValue, new PreciseNumberFactory(precision));
    }
}
exports.NumberForPreciseMath = NumberForPreciseMath;
class DecimalForPreciseMath extends NumberForPreciseMath {
    constructor(decimalValue, precision) {
        const factor = new big_js_1.Big(Math.pow(10, precision));
        const decimal = new big_js_1.Big(decimalValue);
        super(precision, decimal.times(factor).round(0, big_js_1.Big.roundDown));
    }
}
exports.DecimalForPreciseMath = DecimalForPreciseMath;
//# sourceMappingURL=precise-numbers.js.map