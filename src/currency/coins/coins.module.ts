import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { SharedDatabaseConnectionsModule } from "../../database/db-connections.module";
import { SharedDatabaseConnectionName } from "../../database/constants";

import { CoinsController } from "./controllers/coins.controller";
import { Coin } from "./entities/coin.entity";
import { CoinRepository } from "./repositories/coin.repository";
import { CoinsService } from "./services/coins.service";
import { CoinDataProvider } from "./services/coin-data-provider";

@Module({
  imports: [
    // for database connection
    SharedDatabaseConnectionsModule,
    // for database entity
    TypeOrmModule.forFeature([Coin], SharedDatabaseConnectionName.CURRENCY),
  ],
  providers: [CoinsService, CoinDataProvider, CoinRepository],
  controllers: [CoinsController],
  exports: [CoinDataProvider, SharedDatabaseConnectionsModule],
})
export class SharedCoinsModule {}
