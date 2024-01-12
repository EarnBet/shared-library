import { Injectable } from "@nestjs/common";

import { SharedUsersService } from "../../users/services/users-shared.service";

import { AdminUserRole } from "../entities/admin-roles";
import { IAddAdminInput, IAddAdminUserInput } from "../inputs/interfaces";
import { AdminUserRepository } from "../repositories/admin-user.repository";

@Injectable()
export class AdminUsersService {
  constructor(
    private repository: AdminUserRepository,
    readonly users: SharedUsersService
  ) {}

  async getAllAdminUsers() {
    const admins = await this.repository.findAll();

    return admins.map((admin) => {
      const user = admin.user;

      delete admin.user;

      return { ...admin, username: user.username, email: user.email };
    });
  }

  addRootAdmin(input: IAddAdminInput) {
    return this.addAdmin({ ...input, role: AdminUserRole.ROOT_ADMIN });
  }

  addSuperAdmin(input: IAddAdminInput) {
    return this.addAdmin({ ...input, role: AdminUserRole.SUPER_ADMIN });
  }

  addRegularAdmin(input: IAddAdminInput) {
    return this.addAdmin({ ...input, role: AdminUserRole.REGULAR_ADMIN });
  }

  addSupportAdmin(input: IAddAdminInput) {
    return this.addAdmin({ ...input, role: AdminUserRole.SUPPORT_ADMIN });
  }

  private async addAdmin(input: IAddAdminUserInput) {
    const { user_id } = input;

    const isUserFound = await this.users.isUserFound(user_id);

    if (!isUserFound) {
      throw new Error("user does not exist!");
    }

    const existingAdmin = await this.getAdminUser(user_id);

    if (!existingAdmin) {
      await this.repository.insertOne(input);
    } else {
      await this.repository.updateRoleForUser(input);
    }
  }

  removeAdmin(userId: number) {
    return this.repository.removeAdminUser(userId);
  }

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
