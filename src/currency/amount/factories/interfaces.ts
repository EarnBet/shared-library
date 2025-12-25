import { BigSource } from "big.js";

import { CoinId } from "../../coins/coins";
import { ICurrency } from "../../coins/entities/interfaces";
import { ICoinDataProvider } from "../../coins/services/interfaces";

import { IPreciseNumber, IPreciseMath } from "../../../math/interfaces";
import { PreciseMath } from "../../../math/precise-math";
import { ICurrencyPriceService } from "../price-service/interfaces";

export interface IPreciseCurrencyAmount extends IPreciseNumber {
  readonly currency: ICurrency;
  readonly quantity: string;

  readonly integerForBlockChain: string;
  readonly quantityForBlockChain: string;
}

export interface IPreciseCurrencyAmountWithPrice
  extends IPreciseCurrencyAmount {
  readonly priceInUSD: number;
  readonly amountInUSD: string;
}

export declare type PreciseNumberForMath = PreciseMath<IPreciseNumber>;
export declare type CurrencyAmountForMath = PreciseMath<IPreciseCurrencyAmount>;
export declare type CurrencyAmountWithPriceForMath =
  PreciseMath<IPreciseCurrencyAmountWithPrice>;

export interface ICurrencyAmount
  extends IPreciseCurrencyAmount,
    IPreciseMath<IPreciseCurrencyAmount> {
  readonly math: CurrencyAmountForMath;
}

export interface ICurrencyAmountWithPrice
  extends IPreciseCurrencyAmountWithPrice,
    IPreciseMath<IPreciseCurrencyAmountWithPrice> {
  readonly math: CurrencyAmountWithPriceForMath;
}

export interface ICurrencyAmountFactory {
  readonly coinDataProvider: ICoinDataProvider;

  newAmountFromQuantity(quantity: string): Promise<ICurrencyAmount>;
  newAmountFromDecimal(
    decimalAmount: BigSource,
    tokenSymbol: string
  ): Promise<ICurrencyAmount>;
  newAmountFromDecimalAndCoinId(
    decimalAmount: BigSource,
    coinId: CoinId
  ): Promise<ICurrencyAmount>;
  newAmountFromInteger(
    integerSubunits: BigSource,
    tokenSymbol: string
  ): Promise<ICurrencyAmount>;
}

export interface ICurrencyAmountWithPriceFactory
  extends ICurrencyAmountFactory {
  readonly priceService: ICurrencyPriceService;

  newAmountFromQuantity(quantity: string): Promise<ICurrencyAmountWithPrice>;
  newAmountFromDecimal(
    decimalAmount: BigSource,
    tokenSymbol: string
  ): Promise<ICurrencyAmountWithPrice>;
  newAmountFromDecimalAndCoinId(
    decimalAmount: BigSource,
    coinId: CoinId
  ): Promise<ICurrencyAmountWithPrice>;
  newAmountFromInteger(
    integerSubunits: BigSource,
    tokenSymbol: string
  ): Promise<ICurrencyAmountWithPrice>;
}

export interface ICurrencyAmountData {
  symbol: string;
  decimal: string;
}
