import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { SharedDatabaseConnectionName } from "../../../../database/constants";
import { TypeOrmRepository } from "../../../../database/typeorm/typeorm-repository.base";

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
}
