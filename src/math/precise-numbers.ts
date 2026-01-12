import { Big, BigSource } from "big.js";

import {
  IMatchingNumberTypeValidator,
  IPreciseMath,
  IPreciseNumber,
  IPreciseNumberFactory,
} from "./interfaces";
import { PreciseMath } from "./precise-math";

export class PreciseNumber implements IPreciseNumber {
  readonly factor: Big;
  readonly bigInteger: Big;
  readonly decimal: string;

  constructor(readonly precision: number, integerValue: BigSource = 0) {
    this.factor = new Big(Math.pow(10, precision));

    this.bigInteger = new Big(integerValue);

    this.decimal = this.bigInteger
      .div(this.factor)
      .toFixed(precision, Big.roundDown);
  }

  isLessThan(other: IPreciseNumber) {
    this.validateMatchingCurrency(other);

    return this.bigInteger.lt(other.integerForMath);
  }
  isLessThanDecimal(other: BigSource) {
    return new Big(this.decimal).lt(other);
  }

  isGreaterThan(other: IPreciseNumber) {
    this.validateMatchingCurrency(other);

    return this.bigInteger.gt(other.integerForMath);
  }
  isGreaterThanOrEqualTo(other: IPreciseNumber) {
    this.validateMatchingCurrency(other);

    return this.bigInteger.gte(other.integerForMath);
  }

  isGreaterThanDecimal(other: BigSource) {
    return new Big(this.decimal).gt(other);
  }
  isGreaterThanOrEqualToDecimal(other: BigSource): boolean {
    return new Big(this.decimal).gte(other);
  }

  isEqualTo(other: IPreciseNumber) {
    this.validateMatchingCurrency(other);

    return this.bigInteger.eq(other.integerForMath);
  }
  isEqualToDecimal(other: BigSource) {
    return new Big(this.decimal).eq(other);
  }

  protected validateMatchingCurrency(other: IPreciseNumber) {
    if (this.precision != other.precision) {
      throw new Error("both amounts must be the same precision!");
    }
  }

  get integerForMath() {
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

export class PreciseDecimal extends PreciseNumber {
  constructor(decimalValue: BigSource, precision: number) {
    const factor = new Big(Math.pow(10, precision));

    const decimal = new Big(decimalValue);

    super(precision, decimal.times(factor).round(0, Big.roundDown));
  }
}

class MatchingPrecisionValidator
  implements IMatchingNumberTypeValidator<IPreciseNumber>
{
  constructor(private readonly precision: number) {}

  isMatchingType(other: IPreciseNumber): boolean {
    if (this.precision != other.precision) {
      throw new Error("both amounts must be the same precision!");
    } else {
      return true;
    }
  }
}

class PreciseNumberFactory implements IPreciseNumberFactory<IPreciseNumber> {
  readonly validator: IMatchingNumberTypeValidator<IPreciseNumber>;

  constructor(precision: number) {
    this.validator = new MatchingPrecisionValidator(precision);
  }

  newAmountFromInteger(integer: BigSource, precision: number): IPreciseNumber {
    const number = new PreciseNumber(precision, integer);

    this.validator.isMatchingType(number);

    return number;
  }

  newAmountFromDecimal(decimal: BigSource, precision: number): IPreciseNumber {
    const number = new PreciseDecimal(decimal, precision);

    this.validator.isMatchingType(number);

    return number;
  }
}

export class NumberForPreciseMathBase<T extends IPreciseNumber>
  implements IPreciseNumber, IPreciseMath<T>
{
  readonly math: PreciseMath<T>;

  constructor(
    precision: number,
    integerValue: BigSource,
    readonly factory: IPreciseNumberFactory<T>
  ) {
    const number = factory.newAmountFromInteger(integerValue, precision);

    this.math = new PreciseMath(number, factory);
  }

  addDecimal(decimal: BigSource) {
    return this.math.addDecimal(decimal);
  }
  add(amount: T) {
    return this.math.add(amount);
  }

  subtractDecimal(decimal: BigSource) {
    return this.math.subtractDecimal(decimal);
  }
  subtract(amount: T) {
    return this.math.subtract(amount);
  }

  multiplyDecimal(decimal: BigSource) {
    return this.math.multiplyDecimal(decimal);
  }
  divideDecimal(decimal: BigSource) {
    return this.math.divideDecimal(decimal);
  }

  absoluteValue() {
    return this.math.absoluteValue();
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

  get integerForMath() {
    return this.number.integerForMath;
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

export class NumberForPreciseMath extends NumberForPreciseMathBase<IPreciseNumber> {
  constructor(precision: number, integerValue: BigSource = 0) {
    super(precision, integerValue, new PreciseNumberFactory(precision));
  }
}

export class DecimalForPreciseMath extends NumberForPreciseMath {
  constructor(decimalValue: BigSource, precision: number) {
    const factor = new Big(Math.pow(10, precision));

    const decimal = new Big(decimalValue);

    super(precision, decimal.times(factor).round(0, Big.roundDown));
  }
}
