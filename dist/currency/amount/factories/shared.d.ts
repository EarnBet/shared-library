import { BigSource } from "big.js";
import { ICurrency } from "../../coins/entities/interfaces";
import { IMatchingNumberTypeValidator } from "../../../math/interfaces";
import { PreciseDecimal } from "../../../math/precise-numbers";
import { IPreciseCurrencyAmount, ICurrencyAmount } from "./interfaces";
export declare class MatchingCurrencyValidator implements IMatchingNumberTypeValidator<IPreciseCurrencyAmount> {
    private currency;
    constructor(currency: ICurrency);
    isMatchingType({ currency }: ICurrencyAmount): boolean;
}
export declare class PreciseCurrencyAmount extends PreciseDecimal implements IPreciseCurrencyAmount {
    readonly currency: ICurrency;
    constructor(decimalValue: BigSource, currency: ICurrency);
    get quantity(): string;
}
//# sourceMappingURL=shared.d.ts.map