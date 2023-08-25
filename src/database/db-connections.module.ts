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
      poolSize: 2,
    }),
  ],
  exports: [SharedConfigModule, TypeOrmModule],
})
export class SharedDatabaseConnectionsModule {}
