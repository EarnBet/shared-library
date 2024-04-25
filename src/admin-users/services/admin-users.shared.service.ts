import { Injectable } from "@nestjs/common";

import { SharedUsersService } from "../../users/services/users-shared.service";

import { AdminUserRole } from "../entities/admin-roles";
import { SharedAdminUserRepository } from "../repositories/admin-user.shared.repository";

@Injectable()
export class SharedAdminUsersService {
  constructor(
    readonly repository: SharedAdminUserRepository,
    readonly users: SharedUsersService
  ) {}

  isRootAdmin(userId: number): Promise<boolean> {
    return this.isAdminUserWithRole({
      user_id: userId,
      role: AdminUserRole.ROOT_ADMIN,
    });
  }

  isSuperAdmin(userId: number): Promise<boolean> {
    return this.isAdminUserWithRole({
      user_id: userId,
      role: AdminUserRole.SUPER_ADMIN,
    });
  }

  isRegularAdmin(userId: number): Promise<boolean> {
    return this.isAdminUserWithRole({
      user_id: userId,
      role: AdminUserRole.REGULAR_ADMIN,
    });
  }

  async isAdminUserWithRole({
    user_id,
    role,
  }: {
    user_id: number;
    role: AdminUserRole;
  }): Promise<boolean> {
    const admin = await this.getAdminUser(user_id);

    // make sure admin user is found and has the appropriate privileges
    return admin && admin.role <= role;
  }

  getAdminUser(userId: number) {
    return this.repository.findOneById(userId);
  }
}
