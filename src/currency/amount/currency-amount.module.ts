import { Module } from "@nestjs/common";

import { SharedCoinsModule } from "../coins/coins.module";
import { CurrencyAmountService } from "./services/currency-amount.service";

@Module({
  imports: [SharedCoinsModule],
  providers: [CurrencyAmountService],
  exports: [CurrencyAmountService, SharedCoinsModule],
})
export class CurrencyAmountModule {}
