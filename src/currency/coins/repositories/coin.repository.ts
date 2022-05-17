import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { CoinId } from "./../coins";
import { Coin } from "../entities/coin.entity";
import { SharedDatabaseConnectionName } from "../../../database/constants";

@Injectable()
export class CoinRepository {
  constructor(
    // ** when using multiple database connections,
    // we are forced to inject the repoistory in this way
    // so we need an extra class to wrap around this property
    // in order to hide the database logic from the business logic layer
    @InjectRepository(Coin, SharedDatabaseConnectionName.CURRENCY)
    private repository: Repository<Coin>
  ) {}

  async createCoins() {
    await this.repository.clear();

    // TODO: add the rest of the coins from the list below
    /*
        #INSERT INTO earnbet_currency_test.`coin` VALUES

        (4,'LTC',8,0,0.0100000000),
        (5,'XRP',6,1,21.0000000000),
        (6,'BCH',8,0,0.0030000000),
        (7,'BNB',8,1,0.0100000000),
        (8,'WAX',8,1,0.0000000000),
        (9,'TRX',6,0,50.0000000000),
        (10,'LINK',8,0,1.0000000000),
        (11,'BET_ETH',4,0,100.0000000000),
        (12,'DAI',8,0,10.0000000000),
        (13,'USDC',6,0,10.0000000000),
        (14,'USDT',6,0,10.0000000000),
        (15,'STACK',18,0,1.0000000000)
        */
    return this.repository.insert([
      {
        id: CoinId.BTC,
        symbol: "BTC",
        precision: 8,
        uses_memo_for_deposits: 0,
        minimum_withdrawal_amount: "0.0001000000",
      },
      {
        id: CoinId.ETH,
        symbol: "ETH",
        precision: 8,
        uses_memo_for_deposits: 0,
        minimum_withdrawal_amount: "0.0050000000",
      },
      {
        id: CoinId.EOS,
        symbol: "EOS",
        precision: 4,
        uses_memo_for_deposits: 1,
        minimum_withdrawal_amount: "0.5",
      },
      {
        id: CoinId.BET_BINANCE,
        symbol: "BET",
        precision: 4,
        uses_memo_for_deposits: 1,
        minimum_withdrawal_amount: "100",
      },
    ]);
  }

  getAllCoins() {
    return this.repository.find();
  }
}
