import { Repository } from "typeorm";
import { WithdrawalRequest } from "../entities/withdrawal-request.entity";
import { TypeOrmRepository } from "../../../../database/typeorm/typeorm-repository.base";
import { IApproveRequestInput, IConfirmRequestInput, INewWithdrawalRequestInput, IRefundRequestInput, IRemoveUserHoldInput, IReprocessRequestInput, ISaveTransactionIdInput, ISelectForUserInput } from "../inputs/interfaces";
export declare class WithdrawalRequestsRepository extends TypeOrmRepository<WithdrawalRequest> {
    constructor(repository: Repository<WithdrawalRequest>);
    addNewRequest(input: INewWithdrawalRequestInput): Promise<number>;
    findByTokenId(confirmation_token_id: number): Promise<WithdrawalRequest>;
    markAsConfirmed({ request_id, confirmed_by_user_id, shouldHold, }: IConfirmRequestInput): Promise<import("typeorm").UpdateResult>;
    private getAllConfirmedRequestsOnHold;
    approveRequest({ request_id, approved_by_user_id }: IApproveRequestInput): Promise<import("typeorm").UpdateResult>;
    approveAllHeldRequestsForUser({ user_id, removed_by_user_id: approved_by_user_id, }: IRemoveUserHoldInput): Promise<import("typeorm").UpdateResult>;
    getAllRequestsForProcessing(): Promise<WithdrawalRequest[]>;
    getTotalWithdrawalsForUsersInThePastDay(user_ids: number[]): Promise<{
        user_id: number;
        totalWithdrawals: string;
    }[]>;
    getTotalWithdrawalsForUserInThePastDay(user_id: number): Promise<string>;
    markAsProcessed(requestId: number): Promise<import("typeorm").UpdateResult>;
    markAsInsufficientFunds(requestId: number): Promise<import("typeorm").UpdateResult>;
    saveError(requestId: number, error_message: string): Promise<import("typeorm").UpdateResult>;
    markAsCancelled(requestId: number): Promise<import("typeorm").UpdateResult>;
    markAsForceCancelledByAdmin({ requestId, cancelled_by_user_id, }: {
        requestId: number;
        cancelled_by_user_id: number;
    }): Promise<import("typeorm").UpdateResult>;
    markAsRefunded({ request_id, refunded_by_user_id }: IRefundRequestInput): Promise<import("typeorm").UpdateResult>;
    markForReprocessing({ request_id, reprocessed_by_user_id, }: IReprocessRequestInput): Promise<import("typeorm").UpdateResult>;
    saveTransactionId({ withdrawal_request_id, transaction_hash, transaction_id, }: ISaveTransactionIdInput): Promise<import("typeorm").UpdateResult>;
    getAllHeldAndFailedRequests(): Promise<WithdrawalRequest[]>;
    getRecentRequests(limit?: number): Promise<WithdrawalRequest[]>;
    getRecentRequestsForUser({ user_id, limit }: ISelectForUserInput): Promise<WithdrawalRequest[]>;
    getTotalWithdrawalsByUser(): Promise<{
        user_id: number;
        currency_symbol: string;
        total_amount: string;
        total_amount_usd: string;
    }[]>;
}
//# sourceMappingURL=withdrawal-requests.repository.d.ts.map