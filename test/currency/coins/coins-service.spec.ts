import { Test } from "@nestjs/testing";

import { CurrencyCoinsModule } from "../../../src/currency/coins/currency-coins.module";
import { CoinsService } from "../../../src/currency/coins/services/coins.service";

(async () => {
  const moduleRef = await Test.createTestingModule({
    imports: [CurrencyCoinsModule.forRoot("test.env")],
  }).compile();

  const coinsService = moduleRef.get(CoinsService);

  const coins = await coinsService.getAllCoins();

  console.log(coins);
})();
