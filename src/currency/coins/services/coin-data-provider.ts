import { Injectable } from "@nestjs/common";

import { sleep } from "../../../util/timer-util";
import { CoinId } from "../coins";
import { SavedCoin } from "../models/saved-coin";
import { CoinsService } from "./coins.service";
import { ICoinDataProvider } from "./interfaces";

@Injectable()
export class CoinDataProvider implements ICoinDataProvider {
  private isInit = false;

  private ids: { [symbol: string]: CoinId } = {};
  private data: { [id: number]: SavedCoin } = {};
  private allCoins: SavedCoin[] = [];

  constructor(private readonly database: CoinsService) {
    this.init();
  }

  private async init() {
    this.allCoins = (await this.database.getAllCoins()).map(
      (row) => new SavedCoin(row)
    );

    for (const row of this.allCoins) {
      // map symbol to ID
      this.ids[row.symbol] = row.id;
      // map ID to data
      this.data[row.id] = row;
    }

    this.isInit = true;
  }

  async getCoinDataBySymbol(symbol: string): Promise<SavedCoin> {
    await this.waitForInit();

    const id = await this.getCoinId(symbol);

    return this.getCoinData(id);
  }

  async getCoinId(symbol: string): Promise<CoinId> {
    await this.waitForInit();

    symbol = symbol.toUpperCase();

    const id = this.ids[symbol];

    if (id === undefined) {
      throw new Error("CoinId NOT FOUND: " + symbol);
    }

    return id;
  }

  async getCoinSymbol(coinId: CoinId): Promise<string> {
    await this.waitForInit();

    const data = await this.getCoinData(coinId);

    return data.symbol;
  }

  async getCoinData(coinId: CoinId): Promise<SavedCoin> {
    await this.waitForInit();

    const data = this.data[coinId];

    if (!data) {
      throw new Error("Coin NOT FOUND: " + coinId);
    }

    return data;
  }

  async getAllCoins() {
    await this.waitForInit();

    return this.allCoins.slice();
  }

  private async waitForInit() {
    while (!this.isInit) {
      await sleep(10);
    }
  }
}
