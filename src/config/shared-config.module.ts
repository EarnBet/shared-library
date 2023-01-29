import * as path from "path";
import * as fs from "fs";

import { DynamicModule, Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import { SharedConfigService } from "./shared-config.service";

@Module({})
export class SharedConfigModule {
  /**
   * imports nest.js ConfigModule.forRoot
   *
   * @param envFileRelativePath - a path to the .env file relative to the working directory of the node.js process, defaults to ".env"
   * @returns a dynamic SharedConfigModule
   */
  static forRoot(envFileRelativePath: string = ".env"): DynamicModule {
    const envFilePath = path.resolve(process.cwd(), envFileRelativePath);

    console.log({ envFileRelativePath, envFilePath });

    const doesFileExist = fs.existsSync(envFilePath);

    if (!doesFileExist) {
      throw new Error(".env file for config does not exist: " + envFilePath);
    }

    return {
      module: SharedConfigModule,
      imports: [ConfigModule.forRoot({ isGlobal: true, envFilePath })],
      providers: [SharedConfigService],
      exports: [SharedConfigService],
    };
  }

  constructor(service: SharedConfigService) {
    const shouldUseRealCurrencyPriceService =
      service.shouldUseRealCurrencyPriceService();

    console.log({ shouldUseRealCurrencyPriceService });
  }
}
