import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { SharedDatabaseConnectionsModule } from "../../../database/db-connections.module";
import { SharedDatabaseConnectionName } from "../../../database/constants";

import { DepositStatus } from "./entities/deposit-status.entity";
import { DepositStatusRepository } from "./repositories/deposit-status.repository";

import { DepositStatusService } from "./services/deposit-status.service";

@Module({
  imports: [
    // for database connection
    SharedDatabaseConnectionsModule,
    // for database entity
    TypeOrmModule.forFeature(
      [DepositStatus],
      SharedDatabaseConnectionName.CURRENCY
    ),
  ],
  providers: [DepositStatusService, DepositStatusRepository],
  exports: [DepositStatusService],
})
export class DepositStatusModule {}
