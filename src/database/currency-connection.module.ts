import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { SharedConfigModule } from "../config/shared-config.module";

import { SharedDatabaseConnectionName } from "./constants";
import { getTypeOrmConnectionConfig } from "./functions";

@Module({
  imports: [
    SharedConfigModule,

    TypeOrmModule.forRoot({
      ...getTypeOrmConnectionConfig(SharedDatabaseConnectionName.CURRENCY),
    }),
  ],
  exports: [SharedConfigModule, TypeOrmModule],
})
export class CurrencyDatabaseConnectionModule {}
