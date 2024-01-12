import { AddAdminUserInput } from "../inputs/add-admin.input";
import { RemoveAdminUserInput } from "../inputs/remove-admin.input";
import { AdminUsersService } from "../services/admin-users.service";
import { RequestContext } from "../../http/request/interfaces";
import { AdminLoginInput } from "../inputs/admin-login.input";
export declare class AdminUsersController {
    private service;
    private readonly request;
    constructor(service: AdminUsersService, request: RequestContext);
    login(input: AdminLoginInput): Promise<{
        role: number;
        id: number;
        username: string;
        email: string;
        token: string;
    }>;
    addSuperAdmin(input: AddAdminUserInput): Promise<void>;
    addRegularAdmin(input: AddAdminUserInput): Promise<void>;
    addRootAdmin(input: AddAdminUserInput): Promise<void>;
    listAdminUsers(): Promise<{
        username: string;
        email: string;
        user_id: number;
        role: number;
        added_by_user_id: number;
        added_at: Date;
        updated_at: Date;
        user: import("../..").User;
    }[]>;
    removeAdmin(input: RemoveAdminUserInput): Promise<import("typeorm").DeleteResult>;
}
//# sourceMappingURL=admin-users.controller.d.ts.map