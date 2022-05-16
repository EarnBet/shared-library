import { CoinsService } from "../services/coins.service";
export declare class CoinsController {
    private coinsService;
    constructor(coinsService: CoinsService);
    getAllCoins(): Promise<import("../entities/coin.entity").Coin[]>;
}
//# sourceMappingURL=coins.controller.d.ts.map