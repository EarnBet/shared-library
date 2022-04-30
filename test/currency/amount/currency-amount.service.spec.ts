import { Test } from "@nestjs/testing";

import { CurrencyAmountModule } from "../../../src/currency/amount/currency-amount.module";
import { CurrencyAmountService } from "../../../src/currency/amount/services/currency-amount.service";

(async () => {
  const moduleRef = await Test.createTestingModule({
    imports: [CurrencyAmountModule.forRoot("test.env")],
  }).compile();

  const amountService = moduleRef.get(CurrencyAmountService);

  const coins = await amountService.getAllCoins();
  console.log(coins);

  const prices = await amountService.getAllCoinPrices();
  console.log(prices);
})();
