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
  IPreciseCurrencyAmountWithPrice,
  IPreciseCurrencyAmount,
  ICurrencyAmountWithPrice,
  ICurrencyAmountWithPriceFactory,
} from "./interfaces";
import { PreciseCurrencyAmount, MatchingCurrencyValidator } from "./shared";
import { getRealCoinPriceService } from "../price-service/coin-price.service";
import { ICurrencyPriceService } from "../price-service/interfaces";

class PreciseCurrencyAmountWithPrice
  extends PreciseCurrencyAmount
  implements IPreciseCurrencyAmountWithPrice
{
  constructor(
    decimalValue: BigSource,
    currency: ICurrency,
    readonly priceInUSD: number
  ) {
    super(decimalValue, currency);
  }

  get amountInUSD() {
    this.checkPrice();

    return new Big(this.decimal)
      .times(this.priceInUSD)
      .round(6, Big.roundDown)
      .toString();
  }

  private checkPrice() {
    if (this.priceInUSD == undefined) {
      throw new Error("Price for Currency IS NOT DEFINED!");
    }
  }
}

class PreciseCurrencyAmountWithPriceFactory
  implements IPreciseNumberFactory<IPreciseCurrencyAmountWithPrice>
{
  readonly validator: IMatchingNumberTypeValidator<IPreciseCurrencyAmount>;

  constructor(
    private readonly currency: ICurrency,
    private readonly priceInUSD: number
  ) {
    this.validator = new MatchingCurrencyValidator(currency);
  }

  newAmountFromInteger(
    integer: BigSource,
    precision: number
  ): IPreciseCurrencyAmountWithPrice {
    const number = new PreciseCurrencyAmountWithPrice(
      new Big(integer).div(Math.pow(10, precision)),
      this.currency,
      this.priceInUSD
    );

    this.validator.isMatchingType(number);

    return number;
  }
  newAmountFromDecimal(
    decimal: BigSource,
    precision: number
  ): IPreciseCurrencyAmountWithPrice {
    const number = new PreciseCurrencyAmountWithPrice(
      decimal,
      this.currency,
      this.priceInUSD
    );

    this.validator.isMatchingType(number);

    return number;
  }
}

class CurrencyAmountWithPrice
  extends NumberForPreciseMathBase<IPreciseCurrencyAmountWithPrice>
  implements ICurrencyAmountWithPrice
{
  constructor(
    decimalValue: BigSource,
    readonly currency: ICurrency,
    priceInUSD: number
  ) {
    super(
      currency.precision,
      new Big(decimalValue)
        .times(Math.pow(10, currency.precision))
        .round(0, Big.roundDown),
      new PreciseCurrencyAmountWithPriceFactory(currency, priceInUSD)
    );
  }

  get amountInUSD() {
    return this.number.amountInUSD;
  }

  get priceInUSD() {
    return this.number.priceInUSD;
  }

  get quantity() {
    return this.number.quantity;
  }
}

class CurrencyAmountWithPriceFactory
  implements ICurrencyAmountWithPriceFactory
{
  constructor(
    readonly coinDataProvider: ICoinDataProvider,
    readonly priceService: ICurrencyPriceService
  ) {}

  async newAmountFromQuantity(
    quantity: string
  ): Promise<CurrencyAmountWithPrice> {
    const [amount, tokenSymbol] = quantity.split(" ");

    return this.newAmountFromDecimal(amount, tokenSymbol);
  }

  async newAmountFromDecimal(
    decimalAmount: BigSource,
    tokenSymbol: string
  ): Promise<CurrencyAmountWithPrice> {
    const data = await this.coinDataProvider.getCoinDataBySymbol(tokenSymbol);

    return new CurrencyAmountWithPrice(
      decimalAmount,
      data,
      await this.priceService.getPriceInUSD(data.symbol)
    );
  }

  async newAmountFromDecimalAndCoinId(
    decimalAmount: BigSource,
    coinId: CoinId
  ): Promise<CurrencyAmountWithPrice> {
    const data = await this.coinDataProvider.getCoinData(coinId);

    return new CurrencyAmountWithPrice(
      decimalAmount,
      data,
      await this.priceService.getPriceInUSD(data.symbol)
    );
  }

  async newAmountFromInteger(
    integerSubunits: BigSource,
    tokenSymbol: string
  ): Promise<CurrencyAmountWithPrice> {
    const data = await this.coinDataProvider.getCoinDataBySymbol(tokenSymbol);

    const decimalAmount = new Big(integerSubunits).div(
      Math.pow(10, data.precision)
    );

    return new CurrencyAmountWithPrice(
      decimalAmount,
      data,
      await this.priceService.getPriceInUSD(data.symbol)
    );
  }
}

let currencyAmountWithPriceFactory: CurrencyAmountWithPriceFactory;

export function getCurrencyAmountWithPriceFactory(
  coinDataProvider: ICoinDataProvider,
  priceService: ICurrencyPriceService = undefined
): CurrencyAmountWithPriceFactory {
  if (currencyAmountWithPriceFactory == undefined) {
    if (priceService == undefined) {
      priceService = getRealCoinPriceService(coinDataProvider);
    }

    currencyAmountWithPriceFactory = new CurrencyAmountWithPriceFactory(
      coinDataProvider,
      priceService
    );
  }

  return currencyAmountWithPriceFactory;
}
