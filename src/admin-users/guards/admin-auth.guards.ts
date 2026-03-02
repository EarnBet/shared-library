import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UseGuards,
} from "@nestjs/common";

import { RequestContext } from "../../http/request/interfaces";
import { AuthService } from "../../auth/services/auth.service";
import { AuthGuard } from "../../auth/guards/auth.guard";
import { SharedAdminUsersService } from "../services/admin-users.shared.service";
import { UnauthorizedError } from "../../http/exception/application-errors";
import { AdminUserRole } from "../entities/admin-roles";

class AdminAuthGuard extends AuthGuard implements CanActivate {
  constructor(
    authService: AuthService,
    private service: SharedAdminUsersService,
    private role: AdminUserRole,
  ) {
    super(authService);
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isAuthenticated = await super.canActivate(context);

    const error = new UnauthorizedError();

    if (!isAuthenticated) {
      throw error;
    }

    const request = context.switchToHttp().getRequest<RequestContext>();

    const { authorizedUserData } = request;
    const { user_id } = authorizedUserData;

    const isAuthorized = await this.service.isAdminUserWithRole({
      user_id,
      role: this.role,
    });

    if (!isAuthorized) {
      throw error;
    }

    return true;
  }
}

@Injectable()
class RootAdminAuthGuard extends AdminAuthGuard {
  constructor(authService: AuthService, service: SharedAdminUsersService) {
    super(authService, service, AdminUserRole.ROOT_ADMIN);
  }
}

@Injectable()
class SuperAdminAuthGuard extends AdminAuthGuard {
  constructor(authService: AuthService, service: SharedAdminUsersService) {
    super(authService, service, AdminUserRole.SUPER_ADMIN);
  }
}

@Injectable()
class RegularAdminAuthGuard extends AdminAuthGuard {
  constructor(authService: AuthService, service: SharedAdminUsersService) {
    super(authService, service, AdminUserRole.REGULAR_ADMIN);
  }
}

@Injectable()
class SupportManagerAdminAuthGuard extends AdminAuthGuard {
  constructor(authService: AuthService, service: SharedAdminUsersService) {
    super(authService, service, AdminUserRole.SUPPORT_MANAGER);
  }
}

@Injectable()
class SupportStaffAdminAuthGuard extends AdminAuthGuard {
  constructor(authService: AuthService, service: SharedAdminUsersService) {
    super(authService, service, AdminUserRole.SUPPORT_STAFF);
  }
}

export function UseRootAdminGuard() {
  return UseGuards(RootAdminAuthGuard);
}

export function UseSuperAdminGuard() {
  return UseGuards(SuperAdminAuthGuard);
}

export function UseRegularAdminGuard() {
  return UseGuards(RegularAdminAuthGuard);
}

export function UseSupportManagerAdminGuard() {
  return UseGuards(SupportManagerAdminAuthGuard);
}

export function UseSupportStaffAdminGuard() {
  return UseGuards(SupportStaffAdminAuthGuard);
}
