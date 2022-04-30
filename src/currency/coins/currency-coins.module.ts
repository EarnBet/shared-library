import { DynamicModule, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { DatabaseConnectionsModule } from "../../database/db-connections.module";
import { SharedDatabaseConnectionName } from "../../database";

import { CoinsController } from "./controllers/coins.controller";
import { Coin } from "./entities/coin.entity";
import { CoinRepository } from "./repositories/coin.repository";
import { CoinsService } from "./services/coins.service";
import { CoinDataProvider } from "./services/coin-data-provider";

@Module({})
export class CurrencyCoinsModule {
  /**
   * creates currency coins module forRoot
   *
   * @param envFileRelativePath - a path to the .env file relative to the working directory of the node.js process, defaults to ".env"
   * @returns a dynamic CurrencyCoinsModule
   */
  static forRoot(envFileRelativePath: string = ".env"): DynamicModule {
    return {
      module: CurrencyCoinsModule,
      imports: [
        // for database connection
        DatabaseConnectionsModule.forRoot(envFileRelativePath),
        // for database entity
        TypeOrmModule.forFeature([Coin], SharedDatabaseConnectionName.CURRENCY),
      ],
      providers: [CoinsService, CoinDataProvider, CoinRepository],
      controllers: [CoinsController],
      exports: [CoinDataProvider, DatabaseConnectionsModule],
    };
  }
}
