import { Big, BigSource } from "big.js";

import {
  IPreciseMath,
  IPreciseNumber,
  IPreciseNumberFactory,
} from "./interfaces";

export class PreciseMath<T extends IPreciseNumber> implements IPreciseMath<T> {
  constructor(
    readonly startingValue: T,
    readonly factory: IPreciseNumberFactory<T>
  ) {}

  addDecimal(decimal: BigSource) {
    const other = this.factory.newAmountFromDecimal(decimal, this.precision);

    return this.add(other);
  }
  add(other: T) {
    this.validator.isMatchingType(other);

    const newInteger = this.startingValue.bigInteger.plus(other.integer);

    const newNumber = this.factory.newAmountFromInteger(
      newInteger,
      this.precision
    );

    return new PreciseMath(newNumber, this.factory);
  }

  subtractDecimal(decimal: BigSource) {
    const other = this.factory.newAmountFromDecimal(decimal, this.precision);

    return this.subtract(other);
  }
  subtract(other: T) {
    this.validator.isMatchingType(other);

    const newInteger = this.startingValue.bigInteger.minus(other.integer);

    const newNumber = this.factory.newAmountFromInteger(
      newInteger,
      this.precision
    );

    return new PreciseMath(newNumber, this.factory);
  }

  divideDecimal(decimal: BigSource) {
    return this.multiplyDecimal(new Big(1).div(decimal));
  }
  multiplyDecimal(decimal: BigSource) {
    const product = new Big(this.startingValue.decimal).times(decimal);

    const newInteger = product.times(this.factor).round(0, Big.roundDown);

    const newNumber = this.factory.newAmountFromInteger(
      newInteger,
      this.precision
    );

    return new PreciseMath(newNumber, this.factory);
  }

  absoluteValue() {
    const newNumber = this.factory.newAmountFromInteger(
      new Big(this.bigInteger).abs(),
      this.precision
    );

    return new PreciseMath(newNumber, this.factory);
  }

  isLessThan(other: T): boolean {
    return this.number.isLessThan(other);
  }
  isLessThanDecimal(other: BigSource) {
    return this.number.isLessThanDecimal(other);
  }

  isGreaterThan(other: T): boolean {
    return this.number.isGreaterThan(other);
  }
  isGreaterThanOrEqualTo(other: T): boolean {
    return this.number.isGreaterThanOrEqualTo(other);
  }
  isGreaterThanDecimal(other: BigSource) {
    return this.number.isGreaterThanDecimal(other);
  }
  isGreaterThanOrEqualToDecimal(other: BigSource) {
    return this.number.isGreaterThanOrEqualToDecimal(other);
  }

  isEqualTo(other: T) {
    return this.number.isEqualTo(other);
  }
  isEqualToDecimal(other: BigSource) {
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

  private get validator() {
    return this.factory.validator;
  }
}
