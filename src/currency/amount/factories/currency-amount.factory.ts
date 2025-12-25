import Big, { BigSource } from "big.js";

import { CoinId } from "../../coins/coins";
import { ICurrency } from "../../coins/entities/interfaces";
import { ICoinDataProvider } from "../../coins/services/interfaces";

import {
  IPreciseNumberFactory,
  IMatchingNumberTypeValidator,
} from "../../../math/interfaces";
import { NumberForPreciseMathBase } from "../../../math/precise-numbers";
import {
  IPreciseCurrencyAmount,
  ICurrencyAmount,
  ICurrencyAmountFactory,
} from "./interfaces";
import { MatchingCurrencyValidator, PreciseCurrencyAmount } from "./shared";
import { maxPrecisionForCurrencyAmounts } from "./constants";

class PreciseCurrencyAmountFactory
  implements IPreciseNumberFactory<IPreciseCurrencyAmount>
{
  readonly validator: IMatchingNumberTypeValidator<IPreciseCurrencyAmount>;

  constructor(private readonly currency: ICurrency) {
    this.validator = new MatchingCurrencyValidator(currency);
  }

  newAmountFromInteger(
    integer: BigSource,
    precision: number
  ): IPreciseCurrencyAmount {
    const number = new PreciseCurrencyAmount(
      new Big(integer).div(Math.pow(10, precision)),
      this.currency
    );

    this.validator.isMatchingType(number);

    return number;
  }
  newAmountFromDecimal(
    decimal: BigSource,
    precision: number
  ): IPreciseCurrencyAmount {
    const number = new PreciseCurrencyAmount(decimal, this.currency);

    this.validator.isMatchingType(number);

    return number;
  }
}

class CurrencyAmount
  extends NumberForPreciseMathBase<IPreciseCurrencyAmount>
  implements ICurrencyAmount
{
  constructor(decimalValue: BigSource, readonly currency: ICurrency) {
    const precision = maxPrecisionForCurrencyAmounts;

    super(
      precision,
      new Big(decimalValue)
        .times(Math.pow(10, precision))
        .round(0, Big.roundDown),
      new PreciseCurrencyAmountFactory(currency)
    );
  }

  get quantity() {
    return this.number.quantity;
  }

  get integerForBlockChain() {
    return this.number.integerForBlockChain;
  }

  get quantityForBlockChain() {
    return this.number.quantityForBlockChain;
  }
}

class CurrencyAmountFactory implements ICurrencyAmountFactory {
  constructor(readonly coinDataProvider: ICoinDataProvider) {}

  async newAmountFromQuantity(quantity: string): Promise<CurrencyAmount> {
    const [amount, tokenSymbol] = quantity.split(" ");

    return this.newAmountFromDecimal(amount, tokenSymbol);
  }

  async newAmountFromDecimal(
    decimalAmount: BigSource,
    tokenSymbol: string
  ): Promise<CurrencyAmount> {
    const data = await this.coinDataProvider.getCoinDataBySymbol(tokenSymbol);

    return new CurrencyAmount(decimalAmount, data);
  }

  async newAmountFromDecimalAndCoinId(
    decimalAmount: BigSource,
    coinId: CoinId
  ): Promise<CurrencyAmount> {
    const data = await this.coinDataProvider.getCoinData(coinId);

    return new CurrencyAmount(decimalAmount, data);
  }

  async newAmountFromInteger(
    integerSubunits: BigSource,
    tokenSymbol: string
  ): Promise<CurrencyAmount> {
    const data = await this.coinDataProvider.getCoinDataBySymbol(tokenSymbol);

    const decimalAmount = new Big(integerSubunits).div(
      Math.pow(10, maxPrecisionForCurrencyAmounts)
    );

    return new CurrencyAmount(decimalAmount, data);
  }
}

/*
let currencyAmountFactory: CurrencyAmountFactory;

export function getCurrencyAmountFactory(
  coinDataProvider: ICoinDataProvider
): CurrencyAmountFactory {
  if (currencyAmountFactory == undefined) {
    //await coinDataProvider.init();

    currencyAmountFactory = new CurrencyAmountFactory(coinDataProvider);
  }

  return currencyAmountFactory;
}
*/
