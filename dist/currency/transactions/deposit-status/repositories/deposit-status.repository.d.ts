import { Repository } from "typeorm";
import { TypeOrmRepository } from "../../../../database/typeorm/typeorm-repository.base";
import { DepositStatus } from "../entities/deposit-status.entity";
export declare class DepositStatusRepository extends TypeOrmRepository<DepositStatus> {
    constructor(repository: Repository<DepositStatus>);
    markDepositAsConfirmed(depositTransactionId: number): Promise<import("typeorm").UpdateResult>;
    markDepositAsCredited(depositTransactionId: number): Promise<import("typeorm").UpdateResult>;
    getAllPendingDeposits(): Promise<DepositStatus[]>;
    getAllConfirmedUncreditedDeposits(): Promise<DepositStatus[]>;
    getTotalDepositsForUserInUSD(user_id: number): Promise<string>;
}
//# sourceMappingURL=deposit-status.repository.d.ts.map