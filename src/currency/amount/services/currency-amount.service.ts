import { Injectable } from "@nestjs/common";

import { BigSource } from "big.js";

import { SharedConfigService } from "../../../config/shared-config.service";
import { CoinDataProvider } from "../../coins/services/coin-data-provider";
import { getCurrencyAmountWithPriceFactory } from "../factories/currency-amount-with-price.factory";
import { ICurrencyAmountWithPriceFactory } from "../factories/interfaces";
import { ICurrencyPriceOutput } from "../outputs/interfaces";
import { mockCurrencyPriceService } from "../price-service/coin-price.service.mock";
import { IPriceMap } from "../price-service/interfaces";

@Injectable()
export class CurrencyAmountService {
  private factory: ICurrencyAmountWithPriceFactory;

  constructor(
    private coinDataProvider: CoinDataProvider,
    private sharedConfigService: SharedConfigService
  ) {}

  createAmountFromDecimal(decimalAmount: BigSource, tokenSymbol: string) {
    return this.getFactory().newAmountFromDecimal(decimalAmount, tokenSymbol);
  }

  createAmountFromInteger(subunits: BigSource, tokenSymbol: string) {
    return this.getFactory().newAmountFromInteger(subunits, tokenSymbol);
  }

  // Quantity String format: 0.1 BTC
  createAmountFromQuantity(quantity: string) {
    return this.getFactory().newAmountFromQuantity(quantity);
  }

  async getAllCoinPrices(): Promise<ICurrencyPriceOutput[]> {
    const allCoins = await this.getAllCoins();

    const output: ICurrencyPriceOutput[] = [];

    for (const coin of allCoins) {
      output.push({
        currency_symbol: coin.symbol,
        currency_precision: coin.precision,
        currency_price_usd: await this.getPriceInUSD(coin.symbol),
        supports_memo: coin.data.usesMemoForDeposits,
        minimum_withdrawal_amount: coin.data.minimumWithdrawalAmount,
      });
    }

    return output;
  }

  // get all the coins that are cached in the amountFactory
  // instead of having to query the database each time
  getAllCoins() {
    return this.getCoinDataProvider().getAllCoins();
  }

  getCoinDataProvider() {
    return this.getFactory().coinDataProvider;
  }

  getPriceInUSD(currencySymbol: string) {
    return this.getFactory().priceService.getPriceInUSD(currencySymbol);
  }

  subscribeToPriceUpdates(callback: (price: IPriceMap) => void) {
    return this.getFactory().priceService.subscribe(callback);
  }

  getFactory() {
    if (!this.factory) {
      const shouldUseRealPriceService =
        this.sharedConfigService.shouldUseRealCurrencyPriceService();

      this.factory = getCurrencyAmountWithPriceFactory(
        this.coinDataProvider,
        shouldUseRealPriceService ? undefined : mockCurrencyPriceService
      );
    }

    return this.factory;
  }
}
