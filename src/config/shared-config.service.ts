import { Injectable } from "@nestjs/common";

import { parseBooleanFromEnv } from ".";

const DEFAULT_COIN_PRICE_UPDATE_INTERVAL = 1000 * 60 * 60; //1 hour

@Injectable()
export class SharedConfigService {
  shouldUseRealCurrencyPriceService(): boolean {
    return parseBooleanFromEnv("USE_REAL_CURRENCY_PRICE_SERVICE");
  }

  coinPriceUpdateInterval(): number {
    return (
      parseInt(process.env["COIN_PRICE_UPDATE_INTERVAL"], 0) ||
      DEFAULT_COIN_PRICE_UPDATE_INTERVAL
    );
  }
}
