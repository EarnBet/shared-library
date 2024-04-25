import { SharedUsersService } from "../../users/services/users-shared.service";
import { AdminUserRole } from "../entities/admin-roles";
import { SharedAdminUserRepository } from "../repositories/admin-user.shared.repository";
export declare class SharedAdminUsersService {
    readonly repository: SharedAdminUserRepository;
    readonly users: SharedUsersService;
    constructor(repository: SharedAdminUserRepository, users: SharedUsersService);
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