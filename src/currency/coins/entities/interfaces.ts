export interface ICurrency {
  id: number;
  symbol: string;
  precision: number;
}

export interface ISavedCoinRow extends ICurrency {
  uses_memo_for_deposits: number;
  minimum_withdrawal_amount: string;
}
