export interface INewWithdrawalRequestInput {
    user_id: number;
    currency_symbol: string;
    decimal_amount: string;
    usd_amount: string;
    withdraw_address: string;
    withdraw_memo: string;
    confirmation_token_id: number;
}
export interface IConfirmRequestInput {
    request_id: number;
    confirmed_by_user_id: number;
    shouldHold: boolean;
}
export interface IApproveRequestInput {
    request_id: number;
    approved_by_user_id: number;
}
export interface IRemoveUserHoldInput {
    user_id: number;
    removed_by_user_id: number;
}
export interface IRefundRequestInput {
    request_id: number;
    refunded_by_user_id: number;
}
export interface IReprocessRequestInput {
    request_id: number;
    reprocessed_by_user_id: number;
}
export interface ISaveTransactionIdInput {
    withdrawal_request_id: number;
    transaction_hash: string;
    transaction_id: number;
}
export interface ISelectForUserInput {
    user_id: number;
    limit?: number;
}
//# sourceMappingURL=interfaces.d.ts.map