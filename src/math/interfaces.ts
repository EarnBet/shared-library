import Big, { BigSource } from "big.js";

import { PreciseMath } from "./precise-math";

export interface IPreciseNumber {
  readonly precision: number;
  readonly decimal: string;
  readonly integerForMath: string;
  readonly isZero: boolean;
  readonly isPositive: boolean;
  readonly isNegative: boolean;
  readonly bigInteger: Big;
  readonly factor: Big;

  isLessThan(other: IPreciseNumber): boolean;
  isLessThanDecimal(other: BigSource): boolean;

  isGreaterThan(other: IPreciseNumber): boolean;
  isGreaterThanDecimal(other: BigSource): boolean;

  isGreaterThanOrEqualTo(other: IPreciseNumber): boolean;
  isGreaterThanOrEqualToDecimal(other: BigSource): boolean;

  isEqualTo(other: IPreciseNumber): boolean;
  isEqualToDecimal(other: BigSource): boolean;
}

export interface IMatchingNumberTypeValidator<T extends IPreciseNumber> {
  isMatchingType(other: T): boolean;
}

export interface IPreciseNumberFactory<T extends IPreciseNumber> {
  // readonly precision:number;
  readonly validator: IMatchingNumberTypeValidator<T>;

  newAmountFromInteger(integer: BigSource, precision: number): T;
  newAmountFromDecimal(decimal: BigSource, precision: number): T;
}

export interface IPreciseMath<T extends IPreciseNumber> extends IPreciseNumber {
  readonly startingValue: T;
  readonly factory: IPreciseNumberFactory<T>;

  addDecimal(decimal: BigSource): PreciseMath<T>;
  add(amount: T): PreciseMath<T>;
  subtractDecimal(decimal: BigSource): PreciseMath<T>;
  subtract(amount: T): PreciseMath<T>;
  multiplyDecimal(decimal: BigSource): PreciseMath<T>;
  divideDecimal(decimal: BigSource): PreciseMath<T>;
  absoluteValue(): PreciseMath<T>;
}
