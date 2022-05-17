import { INewDepositStatusRow, ISavedDepositStatusRow } from "../entities/interfaces";
import { DepositStatusRepository } from "../repositories/deposit-status.repository";
export declare class DepositStatusService {
    private repository;
    constructor(repository: DepositStatusRepository);
    addNewDeposit(data: INewDepositStatusRow): Promise<number>;
    markDepositAsConfirmed(depositTransactionId: number): Promise<import("typeorm").UpdateResult>;
    getSavedDeposit(depositTransactionId: number): Promise<ISavedDepositStatusRow>;
}
//# sourceMappingURL=deposit-status.service.d.ts.map