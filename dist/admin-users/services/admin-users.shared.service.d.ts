import { SharedUsersService } from "../../users/services/users-shared.service";
import { AdminUserRole } from "../entities/admin-roles";
import { AdminUserRepository } from "../repositories/admin-user.repository";
export declare class SharedAdminUsersService {
    readonly repository: AdminUserRepository;
    readonly users: SharedUsersService;
    constructor(repository: AdminUserRepository, users: SharedUsersService);
    isRootAdmin(userId: number): Promise<boolean>;
    isSuperAdmin(userId: number): Promise<boolean>;
    isRegularAdmin(userId: number): Promise<boolean>;
    isAdminUserWithRole({ user_id, role, }: {
        user_id: number;
        role: AdminUserRole;
    }): Promise<boolean>;
    getAdminUser(userId: number): Promise<import("../..").AdminUser>;
}
//# sourceMappingURL=admin-users.shared.service.d.ts.map