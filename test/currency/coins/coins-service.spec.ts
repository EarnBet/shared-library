import { Test } from "@nestjs/testing";

import { SharedCoinsModule } from "../../../src/currency/coins/coins.module";
import { CoinsService } from "../../../src/currency/coins/services/coins.service";

(async () => {
  const moduleRef = await Test.createTestingModule({
    imports: [SharedCoinsModule.forRoot("test.env")],
  }).compile();

  const coinsService = moduleRef.get(CoinsService);

  const coins = await coinsService.getAllCoins();

  console.log(coins);
})();
