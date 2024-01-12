import { Module } from "@nestjs/common";

import { UsersDatabaseModule } from "./users-database.module";
import { SharedUsersService } from "./services/users-shared.service";
import { LoginPasswordValidator } from "./validators/login-password.validator";

@Module({
  imports: [UsersDatabaseModule],
  providers: [SharedUsersService, LoginPasswordValidator],
  exports: [SharedUsersService, UsersDatabaseModule],
})
export class SharedUsersModule {}
