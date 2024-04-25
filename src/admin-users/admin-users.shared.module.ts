import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { SharedUsersModule } from "../users/users-shared.module";
import { SharedDatabaseConnectionName } from "../database/constants";
import { AuthModule } from "../auth/auth.module";

import { AdminUser } from "./entities/admin-user.entity";
import { AdminUserRepository } from "./repositories/admin-user.repository";
import { SharedAdminUsersService } from "./services/admin-users.shared.service";

@Module({
  imports: [
    AuthModule,

    SharedUsersModule,

    TypeOrmModule.forFeature([AdminUser], SharedDatabaseConnectionName.EARNBET),
  ],
  providers: [AdminUserRepository, SharedAdminUsersService],
  controllers: [],
  exports: [SharedAdminUsersService, SharedUsersModule, AuthModule],
})
export class SharedAdminUsersModule {}
