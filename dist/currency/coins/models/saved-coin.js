"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SavedCoin = void 0;
const precise_numbers_1 = require("../../../math/precise-numbers");
class SavedCoin {
    constructor(data) {
        this.id = data.id;
        this.symbol = data.symbol;
        this.precision = data.precision;
        this.usesMemoForDeposits = data.uses_memo_for_deposits == 1;
        this.minimumWithdrawalAmount = new precise_numbers_1.PreciseDecimal(data.minimum_withdrawal_amount, this.precision);
    }
    get data() {
        return {
            id: this.id,
            symbol: this.symbol,
            precision: this.precision,
            usesMemoForDeposits: this.usesMemoForDeposits,
            minimumWithdrawalAmount: this.minimumWithdrawalAmount.decimal,
        };
    }
}
exports.SavedCoin = SavedCoin;
//# sourceMappingURL=saved-coin.js.map