import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { In, IsNull, Raw, Repository } from "typeorm";

import { WithdrawalRequest } from "../entities/withdrawal-request.entity";
import { SharedDatabaseConnectionName } from "../../../../database/constants";
import { TypeOrmRepository } from "../../../../database/typeorm/typeorm-repository.base";
import {
  IsNotNull,
  NOW,
} from "../../../../database/typeorm/typeorm-expressions";
import {
  IApproveRequestInput,
  IConfirmRequestInput,
  INewWithdrawalRequestInput,
  IRefundRequestInput,
  IRemoveUserHoldInput,
  IReprocessRequestInput,
  ISaveTransactionIdInput,
  ISelectForUserInput,
} from "../inputs/interfaces";

@Injectable()
export class WithdrawalRequestsRepository extends TypeOrmRepository<WithdrawalRequest> {
  constructor(
    @InjectRepository(WithdrawalRequest, SharedDatabaseConnectionName.EARNBET)
    repository: Repository<WithdrawalRequest>
  ) {
    super(repository);
  }

  addNewRequest(input: INewWithdrawalRequestInput) {
    return this.insertOne(input);
  }

  findByTokenId(confirmation_token_id: number) {
    return this.findOne({ confirmation_token_id });
  }

  markAsConfirmed({
    request_id,
    confirmed_by_user_id,
    shouldHold,
  }: IConfirmRequestInput) {
    return this.repository.update(
      { id: request_id, confirmed_at: IsNull(), cancelled_at: IsNull() },
      {
        confirmed_at: NOW,
        confirmed_by_user_id,
        is_on_hold: shouldHold ? 1 : 0,
      }
    );
  }

  private getAllConfirmedRequestsOnHold() {
    return this.repository.find({ is_on_hold: 1, confirmed_at: IsNotNull() });
  }

  approveRequest({ request_id, approved_by_user_id }: IApproveRequestInput) {
    return this.repository.update(
      {
        id: request_id,
        confirmed_at: IsNotNull(),
        is_on_hold: 1,
        cancelled_at: IsNull(),
      },
      { is_on_hold: 0, approved_at: NOW, approved_by_user_id }
    );
  }
  approveAllHeldRequestsForUser({
    user_id,
    removed_by_user_id: approved_by_user_id,
  }: IRemoveUserHoldInput) {
    return this.repository.update(
      { user_id, confirmed_at: IsNotNull(), is_on_hold: 1 },
      { is_on_hold: 0, approved_at: NOW, approved_by_user_id }
    );
  }

  getAllRequestsForProcessing() {
    return this.repository.find({
      // must be confirmed
      confirmed_at: IsNotNull(),
      // must NOT be on hold
      is_on_hold: 0,
      // must NOT be processed
      processed_at: IsNull(),
      // must NOT be cancelled
      cancelled_at: IsNull(),
      // must NOT be refunded
      refunded_at: IsNull(),
    });
  }

  getTotalWithdrawalsForUsersInThePastDay(user_ids: number[]) {
    const timeLimitInHours = 24;

    return this.repository
      .createQueryBuilder()
      .select(`SUM(usd_amount)`, `totalWithdrawals`)
      .addSelect("user_id")
      .where({
        user_id: In(user_ids),
        usd_amount: IsNotNull(),
        requested_at: Raw(
          (alias) => `TIMESTAMPDIFF(HOUR,${alias},NOW()) <= ${timeLimitInHours}`
        ),
      })
      .groupBy("user_id")
      .getRawMany<{ user_id: number; totalWithdrawals: string }>();
  }

  async getTotalWithdrawalsForUserInThePastDay(user_id: number) {
    const timeLimitInHours = 24;

    const { total } = await this.repository
      .createQueryBuilder()
      .select(`SUM(usd_amount)`, `total`)
      .where({
        user_id,
        usd_amount: IsNotNull(),
        requested_at: Raw(
          (alias) => `TIMESTAMPDIFF(HOUR,${alias},NOW()) <= ${timeLimitInHours}`
        ),
      })
      .getRawOne<{ total: string }>();

    return total || "0";
  }

  markAsProcessed(requestId: number) {
    return this.repository.update(
      { id: requestId, processed_at: IsNull() },
      { processed_at: NOW }
    );
  }

  markAsInsufficientFunds(requestId: number) {
    return this.repository.update(requestId, {
      insufficient_funds_at: NOW,
      processed_at: null,
    });
  }

  saveError(requestId: number, error_message: string) {
    return this.repository.update(requestId, {
      error_message,
      cancelled_at: NOW,
    });
  }

  markAsCancelled(requestId: number) {
    return this.repository.update(
      {
        id: requestId,
        processed_at: IsNull(),
        cancelled_at: IsNull(),
        refunded_at: IsNull(),
        transaction_id: IsNull(),
      },
      { cancelled_at: NOW }
    );
  }

  markAsForceCancelledByAdmin({
    requestId,
    cancelled_by_user_id,
  }: {
    requestId: number;
    cancelled_by_user_id: number;
  }) {
    return this.repository.update(
      {
        id: requestId,
        cancelled_by_user_id: IsNull(), // NOT already cancelled by admin
        refunded_at: IsNull(),
        transaction_id: IsNull(),
      },
      {
        cancelled_at: NOW,
        is_on_hold: 1,
        error_message: "cancelled by admin",
        cancelled_by_user_id,
      }
    );
  }

  markAsRefunded({ request_id, refunded_by_user_id }: IRefundRequestInput) {
    return this.repository.update(
      {
        id: request_id,
        cancelled_at: IsNotNull(),
        refunded_at: IsNull(),
        transaction_id: IsNull(),
      },
      {
        refunded_at: NOW,
        refunded_by_user_id,
      }
    );
  }

  markForReprocessing({
    request_id,
    reprocessed_by_user_id,
  }: IReprocessRequestInput) {
    return this.repository.update(
      {
        id: request_id,
        cancelled_at: IsNotNull(),
        refunded_at: IsNull(),
        transaction_id: IsNull(),
      },
      {
        reprocessed_at: NOW,
        reprocessed_by_user_id,

        // mark for re-processing:
        processed_at: null,

        // clear error message:
        error_message: null,
        cancelled_at: null,
      }
    );
  }

  saveTransactionId({
    withdrawal_request_id,
    transaction_hash,
    transaction_id,
  }: ISaveTransactionIdInput) {
    return this.repository.update(withdrawal_request_id, {
      transaction_hash,
      transaction_id,
    });
  }

  getAllHeldAndFailedRequests() {
    const commonCriteria = {
      refunded_at: IsNull(),
      transaction_id: IsNull(),
      cancelled_by_user_id: IsNull(),
    };

    return this.repository.find({
      where: [
        // held:
        {
          is_on_hold: 1,
          cancelled_at: IsNull(),

          ...commonCriteria,
        },

        // unprocessed
        {
          confirmed_at: IsNotNull(),
          is_on_hold: 0,
          processed_at: IsNull(),

          ...commonCriteria,
        },

        // insufficient funds:
        {
          insufficient_funds_at: IsNotNull(),
          cancelled_at: IsNull(),

          ...commonCriteria,
        },

        // failed:
        {
          is_on_hold: 0,
          cancelled_at: IsNotNull(),

          ...commonCriteria,
        },
      ],
    });
  }

  getRecentRequests(limit = 100) {
    return this.repository.find({ order: { id: "DESC" }, take: limit });
  }

  getRecentRequestsForUser({ user_id, limit }: ISelectForUserInput) {
    if (limit == undefined) {
      limit = 100;
    }

    return this.repository.find({
      where: { user_id },
      order: { id: "DESC" },
      take: limit,
    });
  }

  async getTotalWithdrawalsByUser() {
    const rows: {
      user_id: number;
      currency_symbol: string;
      total_amount: string;
      total_amount_usd: string;
    }[] = await this.repository.manager.query(
      `SELECT

      user_id,
      currency_symbol,
      sum(decimal_amount) AS total_amount,
      sum(usd_amount) AS total_amount_usd
      
      FROM withdrawal_request
      
      WHERE
      currency_symbol != 'EBET' AND
      cancelled_at IS NULL AND
      refunded_at IS NULL
      
      GROUP BY user_id,currency_symbol
      
      ORDER BY total_amount_usd DESC`
    );

    return rows;
  }
}
