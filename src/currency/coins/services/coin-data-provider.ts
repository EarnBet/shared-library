import { Injectable } from "@nestjs/common";

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

  constructor(private readonly database: CoinsService) {}

  async init() {
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
    const id = await this.getCoinId(symbol);

    return this.getCoinData(id);
  }

  async getCoinId(symbol: string): Promise<CoinId> {
    if (!this.isInit) {
      throw new Error("CoinDataProvider is NOT Initialized!");
    }

    symbol = symbol.toUpperCase();

    const id = this.ids[symbol];

    if (id === undefined) {
      throw new Error("CoinId NOT FOUND: " + symbol);
    }

    return id;
  }

  async getCoinSymbol(coinId: CoinId): Promise<string> {
    const data = await this.getCoinData(coinId);

    return data.symbol;
  }

  async getCoinData(coinId: CoinId): Promise<SavedCoin> {
    if (!this.isInit) {
      throw new Error("CoinDataProvider is NOT Initialized!");
    }

    const data = this.data[coinId];

    if (!data) {
      throw new Error("Coin NOT FOUND: " + coinId);
    }

    return data;
  }

  async getAllCoins() {
    return this.allCoins.slice();
  }
}
