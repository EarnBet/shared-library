import { ISavedDepositStatusRow } from "./interfaces";
export declare class DepositStatus implements ISavedDepositStatusRow {
    transaction_id: number;
    user_id: number;
    decimal_amount: string;
    currency_symbol: string;
    usd_amount: string;
    transaction_hash: string;
    created_at: Date;
    notified_as_pending_at: Date;
    confirmed_at: Date;
    credited_at: Date;
}
//# sourceMappingURL=deposit-status.entity.d.ts.map