import { CoinRepository } from "../repositories/coin.repository";
import { ICoinsService } from "./interfaces";
export declare class CoinsService implements ICoinsService {
    private repository;
    constructor(repository: CoinRepository);
    getAllCoins(): Promise<import("../entities/coin.entity").Coin[]>;
}
//# sourceMappingURL=coins.service.d.ts.map