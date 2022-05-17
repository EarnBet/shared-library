import { Repository } from "typeorm";
import { Coin } from "../entities/coin.entity";
export declare class CoinRepository {
    private repository;
    constructor(repository: Repository<Coin>);
    createCoins(): Promise<import("typeorm").InsertResult>;
    getAllCoins(): Promise<Coin[]>;
}
//# sourceMappingURL=coin.repository.d.ts.map