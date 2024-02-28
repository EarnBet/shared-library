import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { In, IsNull, Raw, Repository } from "typeorm";

import { SharedDatabaseConnectionName } from "../../../../database/constants";
import { TypeOrmRepository } from "../../../../database/typeorm/typeorm-repository.base";
import { IsNotNull } from "../../../../database/typeorm/typeorm-expressions";

import { DepositStatus } from "../entities/deposit-status.entity";
import {
  IGetSumOfDepositsForUserInput,
  ISelectForUserInput,
} from "../inputs/interfaces";

@Injectable()
export class DepositStatusRepository extends TypeOrmRepository<DepositStatus> {
  constructor(
    @InjectRepository(DepositStatus, SharedDatabaseConnectionName.CURRENCY)
    repository: Repository<DepositStatus>
  ) {
    super(repository);
  }

  markDepositAsConfirmed(depositTransactionId: number) {
    return this.repository.update(
      { transaction_id: depositTransactionId, confirmed_at: IsNull() },
      {
        confirmed_at: () => "NOW()",
      }
    );
  }

  markDepositAsCredited(depositTransactionId: number) {
    return this.repository.update(
      { transaction_id: depositTransactionId, credited_at: IsNull() },
      {
        credited_at: () => "NOW()",
      }
    );
  }

  getAllPendingDeposits() {
    return this.find({ confirmed_at: IsNull() });
  }

  getAllConfirmedUncreditedDeposits() {
    return this.find({ confirmed_at: IsNotNull(), credited_at: IsNull() });
  }

  getRecentDeposits(limit = 100) {
    return this.repository.find({
      order: { transaction_id: "DESC" },
      take: limit,
    });
  }

  getRecentDepositsForUser({ user_id, limit }: ISelectForUserInput) {
    if (limit == undefined) {
      limit = 100;
    }

    return this.repository.find({
      where: { user_id },
      order: { transaction_id: "DESC" },
      take: limit,
    });
  }

  getGrandTotalDepositsForUser(user_id: number) {
    return this.getSumOfDepositsForUser({ user_id });
  }

  getTotalDepositsForUserInThePastDay(user_id: number) {
    return this.getSumOfDepositsForUser({ user_id, timeLimitInHours: 24 });
  }

  getSumOfDepositsForUsers(user_ids: number[], timeLimitInHours: number) {
    return this.repository
      .createQueryBuilder()
      .select(`SUM(usd_amount)`, `totalDeposits`)
      .addSelect("user_id")
      .where({
        user_id: In(user_ids),
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
      .groupBy("user_id")
      .getRawMany<{ user_id: number; totalDeposits: string }>();
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

  async getDepositSummaryForUser(user_id: number) {
    const rows: { currency_symbol: string; total_usd_amount: string }[] =
      await this.repository.manager.query(
        `SELECT

        currency_symbol,
        sum(usd_amount) AS total_usd_amount
        
        FROM deposit_status
        
        WHERE
        
        user_id = ${user_id} AND
        credited_at IS NOT NULL
        
        GROUP BY currency_symbol
        ;`
      );

    return rows;
  }
}
