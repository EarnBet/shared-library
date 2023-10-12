import { DepositStatus } from "../entities/deposit-status.entity";
import { INewDepositStatusRow } from "../entities/interfaces";
import { DepositStatusRepository } from "../repositories/deposit-status.repository";
import { IGetSumOfDepositsForUserInput, ISelectForUserInput } from "../inputs/interfaces";
export declare class DepositStatusService {
    readonly repository: DepositStatusRepository;
    constructor(repository: DepositStatusRepository);
    addNewDeposit(data: INewDepositStatusRow): Promise<number>;
    markDepositAsConfirmed(depositTransactionId: number): Promise<import("typeorm").UpdateResult>;
    markDepositAsCredited(depositTransactionId: number): Promise<import("typeorm").UpdateResult>;
    getSavedDeposit(depositTransactionId: number): Promise<DepositStatus>;
    getAllPendingDeposits(): Promise<DepositStatus[]>;
    getAllConfirmedUncreditedDeposits(): Promise<DepositStatus[]>;
    getGrandTotalDepositsForUser(user_id: number): Promise<string>;
    getTotalDepositsForUserInThePastDay(user_id: number): Promise<string>;
    getSumOfDepositsForUser(input: IGetSumOfDepositsForUserInput): Promise<string>;
    getSumOfDepositsForUsers(user_ids: number[], timeLimitInHours?: number): Promise<{
        user_id: number;
        totalDeposits: string;
    }[]>;
    getRecentDeposits(limit?: number): Promise<DepositStatus[]>;
    getRecentDepositsForUser(input: ISelectForUserInput): Promise<DepositStatus[]>;
}
//# sourceMappingURL=deposit-status.service.d.ts.map