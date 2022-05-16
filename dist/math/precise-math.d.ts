import { Big, BigSource } from "big.js";
import { IPreciseMath, IPreciseNumber, IPreciseNumberFactory } from "./interfaces";
export declare class PreciseMath<T extends IPreciseNumber> implements IPreciseMath<T> {
    readonly startingValue: T;
    readonly factory: IPreciseNumberFactory<T>;
    constructor(startingValue: T, factory: IPreciseNumberFactory<T>);
    addDecimal(decimal: BigSource): PreciseMath<T>;
    add(other: T): PreciseMath<T>;
    subtractDecimal(decimal: BigSource): PreciseMath<T>;
    subtract(other: T): PreciseMath<T>;
    divideDecimal(decimal: BigSource): PreciseMath<T>;
    multiplyDecimal(decimal: BigSource): PreciseMath<T>;
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
    get integer(): string;
    get isZero(): boolean;
    get isPositive(): boolean;
    get isNegative(): boolean;
    get bigInteger(): Big;
    get precision(): number;
    get factor(): Big;
    get number(): T;
    private get validator();
}
//# sourceMappingURL=precise-math.d.ts.map