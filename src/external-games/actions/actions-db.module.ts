import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { ExternalGameActionRepository } from "./repositories/action.repository";
import { SoftswissDatabaseConnectionModule } from "../../database/softswiss-connection.module";
import { ExternalGameActionGroup } from "./entities/action-group.entity";
import { ExternalGameAction } from "./entities/action.entity";

@Module({
  imports: [
    SoftswissDatabaseConnectionModule,
    TypeOrmModule.forFeature([ExternalGameAction, ExternalGameActionGroup]),
  ],
  providers: [ExternalGameActionRepository],
  exports: [ExternalGameActionRepository],
})
export class ExternalGameActionsDatabaseModule {}
