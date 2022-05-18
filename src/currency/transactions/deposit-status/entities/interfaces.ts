export interface INewDepositStatusRow {
  transaction_id: number;
  user_id: number;
  decimal_amount: string;
  currency_symbol: string;
  usd_amount: string;
  transaction_hash: string;
}

export interface ISavedDepositStatusRow extends INewDepositStatusRow {
  confirmed_at: Date;
  credited_at: Date;
}
