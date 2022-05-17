import { DepositStatus } from "../entities/deposit-status.entity";
import { INewDepositStatusRow } from "../entities/interfaces";
import { DepositStatusRepository } from "../repositories/deposit-status.repository";
export declare class DepositStatusService {
    private repository;
    constructor(repository: DepositStatusRepository);
    addNewDeposit(data: INewDepositStatusRow): Promise<number>;
    markDepositAsConfirmed(depositTransactionId: number): Promise<import("typeorm").UpdateResult>;
    markDepositAsCredited(depositTransactionId: number): Promise<import("typeorm").UpdateResult>;
    getSavedDeposit(depositTransactionId: number): Promise<DepositStatus>;
    getAllPendingDeposits(): Promise<DepositStatus[]>;
    getAllConfirmedUncreditedDeposits(): Promise<DepositStatus[]>;
}
//# sourceMappingURL=deposit-status.service.d.ts.map