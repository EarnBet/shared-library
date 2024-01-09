import { Module } from "@nestjs/common";

import { UsersDatabaseModule } from "./users-database.module";
import { SharedUsersService } from "./services/users-shared.service";

@Module({
  imports: [UsersDatabaseModule],
  providers: [SharedUsersService],
  exports: [SharedUsersService, UsersDatabaseModule],
})
export class SharedUsersModule {}
