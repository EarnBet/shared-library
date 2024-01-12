import { Body, Controller, Get, Inject, Post } from "@nestjs/common";
import { ApiHeader, ApiTags } from "@nestjs/swagger";
import { Recaptcha } from "@nestlab/google-recaptcha";
import { REQUEST } from "@nestjs/core";

import { BodyWithUser } from "../../auth/decorators/auth.decorators";

import {
  UseRootAdminGuard,
  UseSuperAdminGuard,
} from "../guards/admin-auth.guards";
import { AddAdminUserInput } from "../inputs/add-admin.input";
import { RemoveAdminUserInput } from "../inputs/remove-admin.input";
import { AdminUsersService } from "../services/admin-users.service";

import { RequestContext } from "../../http/request/interfaces";
import { getIpAddress } from "../../http/request/functions";
import { AdminLoginInput } from "../inputs/admin-login.input";

@ApiTags("Admin Users")
@Controller("admin-users")
export class AdminUsersController {
  constructor(
    private service: AdminUsersService,
    @Inject(REQUEST) private readonly request: RequestContext
  ) {}

  @Recaptcha({ action: "login" })
  @Post("login")
  async login(@Body() input: AdminLoginInput) {
    const data = await this.service.users.login({
      ...input,
      ip: getIpAddress(this.request),
    });

    return {
      ...data,
      // return role for admin user
      role: input.adminUser.role,
    };
  }

  @ApiHeader({ name: "Authorization", required: true })
  @UseRootAdminGuard()
  @Post("add-super-admin")
  addSuperAdmin(@BodyWithUser() input: AddAdminUserInput) {
    return this.service.addSuperAdmin({
      user_id: input.admin_user_id,
      added_by_user_id: input.user_id,
    });
  }

  @UseSuperAdminGuard()
  @Post("add-regular-admin")
  addRegularAdmin(@BodyWithUser() input: AddAdminUserInput) {
    return this.service.addRegularAdmin({
      user_id: input.admin_user_id,
      added_by_user_id: input.user_id,
    });
  }

  @UseRootAdminGuard()
  @Post("add-root-admin")
  addRootAdmin(@BodyWithUser() input: AddAdminUserInput) {
    return this.service.addRootAdmin({
      user_id: input.admin_user_id,
      added_by_user_id: input.user_id,
    });
  }

  @UseSuperAdminGuard()
  @Get("")
  listAdminUsers() {
    return this.service.getAllAdminUsers();
  }

  @UseSuperAdminGuard()
  @Post("remove-admin")
  removeAdmin(@BodyWithUser() input: RemoveAdminUserInput) {
    return this.service.removeAdmin(input.admin_user_id);
  }
}
