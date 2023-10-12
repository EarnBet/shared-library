import { Repository } from "typeorm";
import { TypeOrmRepository } from "../../../../database/typeorm/typeorm-repository.base";
import { DepositStatus } from "../entities/deposit-status.entity";
import { IGetSumOfDepositsForUserInput, ISelectForUserInput } from "../inputs/interfaces";
export declare class DepositStatusRepository extends TypeOrmRepository<DepositStatus> {
    constructor(repository: Repository<DepositStatus>);
    markDepositAsConfirmed(depositTransactionId: number): Promise<import("typeorm").UpdateResult>;
    markDepositAsCredited(depositTransactionId: number): Promise<import("typeorm").UpdateResult>;
    getAllPendingDeposits(): Promise<DepositStatus[]>;
    getAllConfirmedUncreditedDeposits(): Promise<DepositStatus[]>;
    getRecentDeposits(limit?: number): Promise<DepositStatus[]>;
    getRecentDepositsForUser({ user_id, limit }: ISelectForUserInput): Promise<DepositStatus[]>;
    getGrandTotalDepositsForUser(user_id: number): Promise<string>;
    getTotalDepositsForUserInThePastDay(user_id: number): Promise<string>;
    getSumOfDepositsForUsers(user_ids: number[], timeLimitInHours: number): Promise<{
        user_id: number;
        totalDeposits: string;
    }[]>;
    getSumOfDepositsForUser({ user_id, timeLimitInHours, }: IGetSumOfDepositsForUserInput): Promise<string>;
}
//# sourceMappingURL=deposit-status.repository.d.ts.map