import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { SharedUsersModule } from "../users/users-shared.module";
import { SharedDatabaseConnectionName } from "../database/constants";

import { AdminUsersController } from "./controllers/admin-users.controller";
import { AdminUser } from "./entities/admin-user.entity";
import { AdminUserRepository } from "./repositories/admin-user.repository";
import { AdminUsersService } from "./services/admin-users.service";
import { AddAdminUserValidator } from "./validators/add-admin.validator";
import { RemoveAdminUserValidator } from "./validators/remove-admin.validator";
import { AdminLoginValidator } from "./validators/admin-login.validator";

@Module({
  imports: [
    SharedUsersModule,

    TypeOrmModule.forFeature([AdminUser], SharedDatabaseConnectionName.EARNBET),
  ],
  providers: [
    AdminUserRepository,

    AdminUsersService,

    AddAdminUserValidator,
    RemoveAdminUserValidator,
    AdminLoginValidator,
  ],
  controllers: [AdminUsersController],
  exports: [AdminUsersService, SharedUsersModule],
})
export class AdminUsersModule {}
