import { AdminUserRole } from "../entities/admin-roles";
export interface IAddAdminInput {
    user_id: number;
    added_by_user_id: number;
}
export interface IAddAdminUserInput extends IAddAdminInput {
    role: AdminUserRole;
}
//# sourceMappingURL=inputs.d.ts.map