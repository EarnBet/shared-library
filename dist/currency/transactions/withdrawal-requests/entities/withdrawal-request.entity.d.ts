import { User } from "../../../../users/entities/user.entity";
export declare class WithdrawalRequest {
    id: number;
    requested_at: Date;
    user_id: number;
    currency_symbol: string;
    decimal_amount: string;
    usd_amount: string;
    withdraw_address: string;
    withdraw_memo: string;
    confirmation_token_id: number;
    is_on_hold: number;
    confirmed_at: Date;
    confirmed_by_user_id: number;
    approved_at: Date;
    approved_by_user_id: number;
    reprocessed_at: Date;
    reprocessed_by_user_id: number;
    processed_at: Date;
    insufficient_funds_at: Date;
    error_message: string;
    cancelled_at: Date;
    cancelled_by_user_id: number;
    refunded_at: Date;
    refunded_by_user_id: number;
    transaction_hash: string;
    transaction_id: number;
    user: User;
}
//# sourceMappingURL=withdrawal-request.entity.d.ts.map