import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { CurrencyDatabaseConnectionModule } from "../../database/currency-connection.module";
import { SharedDatabaseConnectionName } from "../../database/constants";

import { CoinsController } from "./controllers/coins.controller";
import { Coin } from "./entities/coin.entity";
import { CoinRepository } from "./repositories/coin.repository";
import { CoinsService } from "./services/coins.service";
import { CoinDataProvider } from "./services/coin-data-provider";

@Module({
  imports: [
    // for database connection
    CurrencyDatabaseConnectionModule,
    // for database entity
    TypeOrmModule.forFeature([Coin], SharedDatabaseConnectionName.CURRENCY),
  ],
  providers: [CoinsService, CoinDataProvider, CoinRepository],
  controllers: [CoinsController],
  exports: [CoinDataProvider, CurrencyDatabaseConnectionModule],
})
export class SharedCoinsModule {}
