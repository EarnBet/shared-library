import { Module } from "@nestjs/common";
import { ExternalGameActionRepository } from "./repositories/action.repository";
import { SoftswissDatabaseConnectionModule } from "../../database/softswiss-connection.module";

@Module({
  imports: [SoftswissDatabaseConnectionModule],
  providers: [ExternalGameActionRepository],
  exports: [ExternalGameActionRepository],
})
export class ExternalGameActionsDatabaseModule {}
