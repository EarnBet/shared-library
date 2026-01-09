import { TypeOrmModule } from "@nestjs/typeorm";
import { Module } from "@nestjs/common";

import { User } from "../../../users/entities/user.entity";
import { SharedDatabaseConnectionName } from "../../../database/constants";

import { EarnbetDatabaseConnectionModule } from "../../../database/earnbet-connection.module";

import { WithdrawalRequest } from "./entities/withdrawal-request.entity";
import { WithdrawalRequestsRepository } from "./repositories/withdrawal-requests.repository";

@Module({
  imports: [
    EarnbetDatabaseConnectionModule,

    TypeOrmModule.forFeature(
      [WithdrawalRequest, User],
      SharedDatabaseConnectionName.EARNBET
    ),
  ],
  providers: [WithdrawalRequestsRepository],
  exports: [WithdrawalRequestsRepository],
})
export class WithdrawalRequestsRepositoryModule {}
