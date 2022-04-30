import { Injectable } from "@nestjs/common";

import { parseBooleanFromEnv } from ".";

@Injectable()
export class SharedConfigService {
  shouldUseRealCurrencyPriceService(): boolean {
    return parseBooleanFromEnv("USE_REAL_CURRENCY_PRICE_SERVICE");
  }
}
