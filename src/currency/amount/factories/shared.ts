import Big, { BigSource } from "big.js";

import { ICurrency } from "../../coins/entities/interfaces";

import { IMatchingNumberTypeValidator } from "../../../math/interfaces";
import { PreciseDecimal } from "../../../math/precise-numbers";

import { IPreciseCurrencyAmount, ICurrencyAmount } from "./interfaces";
import { maxPrecisionForCurrencyAmounts } from "./constants";

export class MatchingCurrencyValidator
  implements IMatchingNumberTypeValidator<IPreciseCurrencyAmount>
{
  constructor(private currency: ICurrency) {}

  isMatchingType({ currency }: ICurrencyAmount): boolean {
    if (
      this.currency.symbol != currency.symbol ||
      this.currency.precision != currency.precision
    ) {
      throw new Error("both amounts must be the same currency!");
    } else {
      return true;
    }
  }
}

export class PreciseCurrencyAmount
  extends PreciseDecimal
  implements IPreciseCurrencyAmount
{
  readonly precisionForBlockChain: number;

  constructor(decimalValue: BigSource, readonly currency: ICurrency) {
    super(decimalValue, maxPrecisionForCurrencyAmounts);

    this.precisionForBlockChain = currency.precision;
  }

  get quantity() {
    return this.decimal + " " + this.currency.symbol;
  }

  get quantityForBlockChain() {
    return this.decimalForBlockChain + " " + this.currency.symbol;
  }

  get integerForBlockChain() {
    return new Big(this.decimal)
      .times(Math.pow(10, this.precisionForBlockChain))
      .toFixed(0, Big.roundDown);
  }

  get decimalForBlockChain() {
    return new Big(this.decimal).toFixed(
      this.precisionForBlockChain,
      Big.roundDown
    );
  }
}
