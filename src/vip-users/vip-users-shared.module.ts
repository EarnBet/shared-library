import { Module } from "@nestjs/common";
import { VipUsersDatabaseModule } from "./vip-users-database.module";
import { VipUsersSharedService } from "./services/vip-users-shared.service";

@Module({
  imports: [VipUsersDatabaseModule],
  providers: [VipUsersSharedService],
  exports: [VipUsersSharedService, VipUsersDatabaseModule],
})
export class SharedVipUsersModule {}
