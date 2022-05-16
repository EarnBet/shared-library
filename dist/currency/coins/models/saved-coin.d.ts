import { PreciseDecimal } from "../../../math/precise-numbers";
import { CoinId } from "../coins";
import { ICurrency, ISavedCoinRow } from "../entities/interfaces";
export declare class SavedCoin implements ICurrency {
    readonly id: CoinId;
    readonly symbol: string;
    readonly precision: number;
    readonly usesMemoForDeposits: boolean;
    readonly minimumWithdrawalAmount: PreciseDecimal;
    constructor(data: ISavedCoinRow);
    get data(): {
        id: CoinId;
        symbol: string;
        precision: number;
        usesMemoForDeposits: boolean;
        minimumWithdrawalAmount: string;
    };
}
//# sourceMappingURL=saved-coin.d.ts.map