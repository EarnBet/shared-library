import { DepositStatus } from "../entities/deposit-status.entity";
import { INewDepositStatusRow } from "../entities/interfaces";
import { DepositStatusRepository } from "../repositories/deposit-status.repository";
import { IGetSumOfDepositsForUserInput } from "../inputs/interfaces";
export declare class DepositStatusService {
    private repository;
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
}
//# sourceMappingURL=deposit-status.service.d.ts.map