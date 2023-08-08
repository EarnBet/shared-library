import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { IsNull, Raw, Repository } from "typeorm";

import { SharedDatabaseConnectionName } from "../../../../database/constants";
import { TypeOrmRepository } from "../../../../database/typeorm/typeorm-repository.base";
import { IsNotNull } from "../../../../database/typeorm/typeorm-expressions";

import { DepositStatus } from "../entities/deposit-status.entity";
import { IGetSumOfDepositsForUserInput } from "../inputs/interfaces";

@Injectable()
export class DepositStatusRepository extends TypeOrmRepository<DepositStatus> {
  constructor(
    @InjectRepository(DepositStatus, SharedDatabaseConnectionName.CURRENCY)
    repository: Repository<DepositStatus>
  ) {
    super(repository);
  }

  markDepositAsConfirmed(depositTransactionId: number) {
    return this.repository.update(depositTransactionId, {
      confirmed_at: () => "NOW()",
    });
  }

  markDepositAsCredited(depositTransactionId: number) {
    return this.repository.update(depositTransactionId, {
      credited_at: () => "NOW()",
    });
  }

  getAllPendingDeposits() {
    return this.find({ confirmed_at: IsNull() });
  }

  getAllConfirmedUncreditedDeposits() {
    return this.find({ confirmed_at: IsNotNull(), credited_at: IsNull() });
  }

  getGrandTotalDepositsForUser(user_id: number) {
    return this.getSumOfDepositsForUser({ user_id });
  }

  getTotalDepositsForUserInThePastDay(user_id: number) {
    return this.getSumOfDepositsForUser({ user_id, timeLimitInHours: 24 });
  }

  async getSumOfDepositsForUser({
    user_id,
    timeLimitInHours,
  }: IGetSumOfDepositsForUserInput) {
    const { totalDeposits } = await this.repository
      .createQueryBuilder()
      .select(`SUM(usd_amount)`, `totalDeposits`)
      .where({
        user_id,
        usd_amount: IsNotNull(),
        // Deposit must be confirmed and credited!
        credited_at: IsNotNull(),
        ...(timeLimitInHours !== undefined
          ? {
              credited_at: Raw(
                (alias) =>
                  `TIMESTAMPDIFF(HOUR,${alias},NOW()) <= ${timeLimitInHours}`
              ),
            }
          : {}),
      })
      .getRawOne<{ totalDeposits: string }>();

    return totalDeposits || "0";
  }
}
