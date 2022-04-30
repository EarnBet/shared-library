import { PreciseDecimal } from "../../../math/precise-numbers";
import { CoinId } from "../coins";
import { ICurrency, ISavedCoinRow } from "../entities/interfaces";

export class SavedCoin implements ICurrency {
  readonly id: CoinId;
  readonly symbol: string;
  readonly precision: number;
  readonly usesMemoForDeposits: boolean;
  readonly minimumWithdrawalAmount: PreciseDecimal;

  constructor(data: ISavedCoinRow) {
    this.id = data.id;
    this.symbol = data.symbol;
    this.precision = data.precision;
    this.usesMemoForDeposits = data.uses_memo_for_deposits == 1;
    this.minimumWithdrawalAmount = new PreciseDecimal(
      data.minimum_withdrawal_amount,
      this.precision
    );
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
