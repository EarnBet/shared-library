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
}
