import { DynamicModule, Module } from "@nestjs/common";

import { CurrencyCoinsModule } from "../coins/currency-coins.module";
import { CurrencyAmountService } from "./services/currency-amount.service";

@Module({})
export class CurrencyAmountModule {
  /**
   * creates currency amount module forRoot
   *
   * @param envFileRelativePath - a path to the .env file relative to the working directory of the node.js process, defaults to ".env"
   * @returns a dynamic CurrencyAmountModule
   */
  static forRoot(envFileRelativePath: string = ".env"): DynamicModule {
    return {
      module: CurrencyAmountModule,
      imports: [CurrencyCoinsModule.forRoot(envFileRelativePath)],
      providers: [CurrencyAmountService],
      exports: [CurrencyAmountService],
    };
  }
}
