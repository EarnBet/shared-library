import { SharedUsersService } from "../../users/services/users-shared.service";
import { AdminUserRole } from "../entities/admin-roles";
import { IAddAdminInput } from "../inputs/interfaces";
import { AdminUserRepository } from "../repositories/admin-user.repository";
export declare class AdminUsersService {
    private repository;
    readonly users: SharedUsersService;
    constructor(repository: AdminUserRepository, users: SharedUsersService);
    getAllAdminUsers(): Promise<{
        username: string;
        email: string;
        user_id: number;
        role: number;
        added_by_user_id: number;
        added_at: Date;
        updated_at: Date;
        user: import("../..").User;
    }[]>;
    addRootAdmin(input: IAddAdminInput): Promise<void>;
    addSuperAdmin(input: IAddAdminInput): Promise<void>;
    addRegularAdmin(input: IAddAdminInput): Promise<void>;
    addSupportAdmin(input: IAddAdminInput): Promise<void>;
    private addAdmin;
    removeAdmin(userId: number): Promise<import("typeorm").DeleteResult>;
    isRootAdmin(userId: number): Promise<boolean>;
    isSuperAdmin(userId: number): Promise<boolean>;
    isRegularAdmin(userId: number): Promise<boolean>;
    isAdminUserWithRole({ user_id, role, }: {
        user_id: number;
        role: AdminUserRole;
    }): Promise<boolean>;
    getAdminUser(userId: number): Promise<import("../entities/admin-user.entity").AdminUser>;
}
//# sourceMappingURL=admin-users.service.d.ts.map