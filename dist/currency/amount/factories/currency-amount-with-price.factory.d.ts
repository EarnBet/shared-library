import { BigSource } from "big.js";
import { CoinId } from "../../coins/coins";
import { ICurrency } from "../../coins/entities/interfaces";
import { ICoinDataProvider } from "../../coins/services/interfaces";
import { NumberForPreciseMathBase } from "../../../math/precise-numbers";
import { IPreciseCurrencyAmountWithPrice, ICurrencyAmountWithPrice, ICurrencyAmountWithPriceFactory } from "./interfaces";
import { ICurrencyPriceService } from "../price-service/interfaces";
declare class CurrencyAmountWithPrice extends NumberForPreciseMathBase<IPreciseCurrencyAmountWithPrice> implements ICurrencyAmountWithPrice {
    readonly currency: ICurrency;
    constructor(decimalValue: BigSource, currency: ICurrency, priceInUSD: number);
    get amountInUSD(): string;
    get priceInUSD(): number;
    get quantity(): string;
    get integerForBlockChain(): string;
    get quantityForBlockChain(): string;
}
declare class CurrencyAmountWithPriceFactory implements ICurrencyAmountWithPriceFactory {
    readonly coinDataProvider: ICoinDataProvider;
    readonly priceService: ICurrencyPriceService;
    constructor(coinDataProvider: ICoinDataProvider, priceService: ICurrencyPriceService);
    newAmountFromQuantity(quantity: string): Promise<CurrencyAmountWithPrice>;
    newAmountFromDecimal(decimalAmount: BigSource, tokenSymbol: string): Promise<CurrencyAmountWithPrice>;
    newAmountFromDecimalAndCoinId(decimalAmount: BigSource, coinId: CoinId): Promise<CurrencyAmountWithPrice>;
    newAmountFromInteger(integerSubunits: BigSource, tokenSymbol: string): Promise<CurrencyAmountWithPrice>;
}
export declare function getCurrencyAmountWithPriceFactory(coinDataProvider: ICoinDataProvider, priceService?: ICurrencyPriceService): CurrencyAmountWithPriceFactory;
export {};
//# sourceMappingURL=currency-amount-with-price.factory.d.ts.map