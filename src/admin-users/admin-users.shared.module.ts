import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { SharedUsersModule } from "../users/users-shared.module";
import { SharedDatabaseConnectionName } from "../database/constants";
import { AuthModule } from "../auth/auth.module";

import { AdminUser } from "./entities/admin-user.entity";
import { SharedAdminUserRepository } from "./repositories/admin-user.shared.repository";
import { SharedAdminUsersService } from "./services/admin-users.shared.service";

@Module({
  imports: [
    AuthModule,

    SharedUsersModule,

    TypeOrmModule.forFeature([AdminUser], SharedDatabaseConnectionName.EARNBET),
  ],
  providers: [SharedAdminUserRepository, SharedAdminUsersService],
  controllers: [],
  exports: [
    SharedAdminUsersService,
    SharedAdminUserRepository,

    SharedUsersModule,
    AuthModule,
  ],
})
export class SharedAdminUsersModule {}
