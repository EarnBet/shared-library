import { CoinId } from "../coins";
import { SavedCoin } from "../models/saved-coin";
import { CoinsService } from "./coins.service";
import { ICoinDataProvider } from "./interfaces";
export declare class CoinDataProvider implements ICoinDataProvider {
    private readonly database;
    private isInit;
    private ids;
    private data;
    private allCoins;
    constructor(database: CoinsService);
    private init;
    getCoinDataBySymbol(symbol: string): Promise<SavedCoin>;
    getCoinId(symbol: string): Promise<CoinId>;
    getCoinSymbol(coinId: CoinId): Promise<string>;
    getCoinData(coinId: CoinId): Promise<SavedCoin>;
    getAllCoins(): Promise<SavedCoin[]>;
    private waitForInit;
}
//# sourceMappingURL=coin-data-provider.d.ts.map