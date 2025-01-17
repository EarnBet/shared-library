import { Module } from "@nestjs/common";
import { SharedDatabaseConnectionsModule } from "../database/db-connections.module";
import { VipUser } from "./entities/vip-users.entity";
import { SharedDatabaseConnectionName } from "../database/constants";
import { VipUserSharedRepository } from "./repositories/vip-users.repository";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [
    SharedDatabaseConnectionsModule,
    TypeOrmModule.forFeature([VipUser], SharedDatabaseConnectionName.EARNBET),
  ],
  providers: [VipUserSharedRepository],
  exports: [VipUserSharedRepository],
})
export class VipUsersDatabaseModule {}
