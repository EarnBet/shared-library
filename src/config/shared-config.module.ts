import * as path from "path";
import * as fs from "fs";

import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import { SharedConfigService } from "./shared-config.service";

function getEnvFilePath(envFileRelativePath: string = ".env") {
  if (envFileRelativePath == ".env" && process.env.NODE_ENV !== undefined) {
    envFileRelativePath = process.env.NODE_ENV + ".env";
  }

  const envFilePath = path.resolve(process.cwd(), envFileRelativePath);

  console.log({
    NODE_ENV: process.env.NODE_ENV,
    envFileRelativePath,
    envFilePath,
  });

  const doesFileExist = fs.existsSync(envFilePath);

  if (!doesFileExist) {
    throw new Error(".env file for config does not exist: " + envFilePath);
  }

  return envFilePath;
}

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: getEnvFilePath() }),
  ],
  providers: [SharedConfigService],
  exports: [SharedConfigService],
})
export class SharedConfigModule {
  constructor(service: SharedConfigService) {
    const shouldUseRealCurrencyPriceService =
      service.shouldUseRealCurrencyPriceService();

    console.log({ shouldUseRealCurrencyPriceService });
  }
}
