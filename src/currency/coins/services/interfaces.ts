import { CoinId } from "../coins";
import { ICurrency, ISavedCoinRow } from "../entities/interfaces";
import { SavedCoin } from "../models/saved-coin";

export interface ICoinsService {
  getAllCoins(): Promise<ICurrency[]>;
}

export interface ICoinDataProvider {
  init(): Promise<void>;

  getCoinId(symbol: string): Promise<CoinId>;
  getCoinSymbol(coinId: CoinId): Promise<string>;
  getCoinData(coinId: CoinId): Promise<SavedCoin>;
  getCoinDataBySymbol(symbol: string): Promise<SavedCoin>;
  getAllCoins(): Promise<SavedCoin[]>;
}
