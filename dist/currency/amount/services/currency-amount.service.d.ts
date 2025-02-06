import { BigSource } from "big.js";
import { SharedConfigService } from "../../../config/shared-config.service";
import { CoinDataProvider } from "../../coins/services/coin-data-provider";
import { ICurrencyAmountWithPriceFactory } from "../factories/interfaces";
import { ICurrencyPriceOutput } from "../outputs/interfaces";
import { IPriceMap } from "../price-service/interfaces";
export declare class CurrencyAmountService {
    private coinDataProvider;
    private sharedConfigService;
    private factory;
    constructor(coinDataProvider: CoinDataProvider, sharedConfigService: SharedConfigService);
    createAmountFromDecimal(decimalAmount: BigSource, tokenSymbol: string): Promise<import("../factories/interfaces").ICurrencyAmountWithPrice>;
    createAmountFromInteger(subunits: BigSource, tokenSymbol: string): Promise<import("../factories/interfaces").ICurrencyAmountWithPrice>;
    createAmountFromQuantity(quantity: string): Promise<import("../factories/interfaces").ICurrencyAmountWithPrice>;
    getAllCoinPrices(): Promise<ICurrencyPriceOutput[]>;
    getAllCoins(): Promise<import("../../..").SavedCoin[]>;
    getCoinDataProvider(): import("../../..").ICoinDataProvider;
    getPriceInUSD(currencySymbol: string): Promise<number>;
    subscribeToPriceUpdates(callback: (price: IPriceMap) => void): void;
    getFactory(): ICurrencyAmountWithPriceFactory;
}
//# sourceMappingURL=currency-amount.service.d.ts.map