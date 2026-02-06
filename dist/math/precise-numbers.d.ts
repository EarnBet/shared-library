import { Big, BigSource } from "big.js";
import { IPreciseMath, IPreciseNumber, IPreciseNumberFactory } from "./interfaces";
import { PreciseMath } from "./precise-math";
export declare class PreciseNumber implements IPreciseNumber {
    readonly precision: number;
    readonly factor: Big;
    readonly bigInteger: Big;
    readonly decimal: string;
    constructor(precision: number, integerValue?: BigSource);
    isLessThan(other: IPreciseNumber): boolean;
    isLessThanDecimal(other: BigSource): boolean;
    isGreaterThan(other: IPreciseNumber): boolean;
    isGreaterThanOrEqualTo(other: IPreciseNumber): boolean;
    isGreaterThanDecimal(other: BigSource): boolean;
    isGreaterThanOrEqualToDecimal(other: BigSource): boolean;
    isEqualTo(other: IPreciseNumber): boolean;
    isEqualToDecimal(other: BigSource): boolean;
    protected validateMatchingCurrency(other: IPreciseNumber): void;
    get integerForMath(): string;
    get isZero(): boolean;
    get isPositive(): boolean;
    get isNegative(): boolean;
}
export declare class PreciseDecimal extends PreciseNumber {
    constructor(decimalValue: BigSource, precision: number);
}
export declare class NumberForPreciseMathBase<T extends IPreciseNumber> implements IPreciseNumber, IPreciseMath<T> {
    readonly factory: IPreciseNumberFactory<T>;
    readonly math: PreciseMath<T>;
    constructor(precision: number, integerValue: BigSource, factory: IPreciseNumberFactory<T>);
    addDecimal(decimal: BigSource): PreciseMath<T>;
    add(amount: T): PreciseMath<T>;
    subtractDecimal(decimal: BigSource): PreciseMath<T>;
    subtract(amount: T): PreciseMath<T>;
    multiplyDecimal(decimal: BigSource): PreciseMath<T>;
    divideDecimal(decimal: BigSource): PreciseMath<T>;
    absoluteValue(): PreciseMath<T>;
    isLessThan(other: T): boolean;
    isLessThanDecimal(other: BigSource): boolean;
    isGreaterThan(other: T): boolean;
    isGreaterThanOrEqualTo(other: T): boolean;
    isGreaterThanDecimal(other: BigSource): boolean;
    isGreaterThanOrEqualToDecimal(other: BigSource): boolean;
    isEqualTo(other: T): boolean;
    isEqualToDecimal(other: BigSource): boolean;
    get decimal(): string;
    get integerForMath(): string;
    get isZero(): boolean;
    get isPositive(): boolean;
    get isNegative(): boolean;
    get bigInteger(): Big;
    get precision(): number;
    get factor(): Big;
    get number(): T;
    get startingValue(): T;
}
export declare class NumberForPreciseMath extends NumberForPreciseMathBase<IPreciseNumber> {
    constructor(precision: number, integerValue?: BigSource);
}
export declare class DecimalForPreciseMath extends NumberForPreciseMath {
    constructor(decimalValue: BigSource, precision: number);
}
//# sourceMappingURL=precise-numbers.d.ts.map