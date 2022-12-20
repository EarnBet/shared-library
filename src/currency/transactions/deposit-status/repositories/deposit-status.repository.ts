import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { IsNull, Repository } from "typeorm";

import { SharedDatabaseConnectionName } from "../../../../database/constants";
import { TypeOrmRepository } from "../../../../database/typeorm/typeorm-repository.base";
import { IsNotNull } from "../../../../database/typeorm/typeorm-expressions";

import { DepositStatus } from "../entities/deposit-status.entity";

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

  async getTotalDepositsForUserInUSD(user_id: number) {
    const rows = await this.repository
      .createQueryBuilder()
      .select(`SUM(usd_amount)`, `totalDeposits`)
      //.addSelect("user_id", "userId")
      .where({
        user_id,
        usd_amount: IsNotNull(),
        // Deposit must be confirmed and credited!
        credited_at: IsNotNull(),
      })
      //.groupBy("game_id")
      .getRawMany<{ totalDeposits: string }>();

    const [{ totalDeposits }] = rows;

    return totalDeposits;
  }
}
