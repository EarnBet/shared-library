"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PreciseMath = void 0;
const big_js_1 = require("big.js");
class PreciseMath {
    constructor(startingValue, factory) {
        this.startingValue = startingValue;
        this.factory = factory;
    }
    addDecimal(decimal) {
        const other = this.factory.newAmountFromDecimal(decimal, this.precision);
        return this.add(other);
    }
    add(other) {
        this.validator.isMatchingType(other);
        const newInteger = this.startingValue.bigInteger.plus(other.integer);
        const newNumber = this.factory.newAmountFromInteger(newInteger, this.precision);
        return new PreciseMath(newNumber, this.factory);
    }
    subtractDecimal(decimal) {
        const other = this.factory.newAmountFromDecimal(decimal, this.precision);
        return this.subtract(other);
    }
    subtract(other) {
        this.validator.isMatchingType(other);
        const newInteger = this.startingValue.bigInteger.minus(other.integer);
        const newNumber = this.factory.newAmountFromInteger(newInteger, this.precision);
        return new PreciseMath(newNumber, this.factory);
    }
    divideDecimal(decimal) {
        return this.multiplyDecimal(new big_js_1.Big(1).div(decimal));
    }
    multiplyDecimal(decimal) {
        const product = new big_js_1.Big(this.startingValue.decimal).times(decimal);
        const newInteger = product.times(this.factor).round(0, big_js_1.Big.roundDown);
        const newNumber = this.factory.newAmountFromInteger(newInteger, this.precision);
        return new PreciseMath(newNumber, this.factory);
    }
    absoluteValue() {
        const newNumber = this.factory.newAmountFromInteger(new big_js_1.Big(this.bigInteger).abs(), this.precision);
        return new PreciseMath(newNumber, this.factory);
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
    get validator() {
        return this.factory.validator;
    }
}
exports.PreciseMath = PreciseMath;
//# sourceMappingURL=precise-math.js.map