import { Injectable } from "@nestjs/common";

import { BigSource } from "big.js";

import { SharedConfigService } from "../../../config/shared-config.service";
import { CoinDataProvider } from "../../coins/services/coin-data-provider";
import { getCurrencyAmountWithPriceFactory } from "../factories/currency-amount-with-price.factory";
import { ICurrencyAmountWithPriceFactory } from "../factories/interfaces";
import { ICurrencyPriceOutput } from "../outputs/interfaces";
import { mockCurrencyPriceService } from "../price-service/coin-price.service.mock";

@Injectable()
export class CurrencyAmountService {
  private factory: ICurrencyAmountWithPriceFactory;

  constructor(
    private coinDataProvider: CoinDataProvider,
    private sharedConfigService: SharedConfigService
  ) {}

  async createAmountFromDecimal(decimalAmount: BigSource, tokenSymbol: string) {
    await this.getFactory();

    return this.factory.newAmountFromDecimal(decimalAmount, tokenSymbol);
  }

  async createAmountFromInteger(subunits: BigSource, tokenSymbol: string) {
    await this.getFactory();

    return this.factory.newAmountFromInteger(subunits, tokenSymbol);
  }

  // Quantity String format: 0.1 BTC
  async createAmountFromQuantity(quantity: string) {
    await this.getFactory();

    return this.factory.newAmountFromQuantity(quantity);
  }

  async getAllCoinPrices(): Promise<ICurrencyPriceOutput[]> {
    const allCoins = await this.getAllCoins();

    const output: ICurrencyPriceOutput[] = [];

    for (const coin of allCoins) {
      output.push({
        currency_symbol: coin.symbol,
        currency_price_usd: await this.getPriceInUSD(coin.symbol),
      });
    }

    return output;
  }

  // get all the coins that are cached in the amountFactory
  // instead of having to query the database each time
  async getAllCoins() {
    const coinDataProvider = await this.getCoinDataProvider();

    return coinDataProvider.getAllCoins();
  }

  async getCoinDataProvider() {
    await this.getFactory();

    return this.factory.coinDataProvider;
  }

  async getPriceInUSD(currencySymbol: string) {
    await this.getFactory();

    return this.factory.priceService.getPriceInUSD(currencySymbol);
  }

  private async getFactory() {
    if (!this.factory) {
      const shouldUseRealPriceService =
        this.sharedConfigService.shouldUseRealCurrencyPriceService();

      this.factory = await getCurrencyAmountWithPriceFactory(
        this.coinDataProvider,
        shouldUseRealPriceService ? undefined : mockCurrencyPriceService
      );
    }

    return this.factory;
  }
}
