import { Repository } from "typeorm";
import { TypeOrmRepository } from "../../database/typeorm/typeorm-repository.base";
import { AdminUser } from "../entities/admin-user.entity";
import { IAddAdminUserInput } from "../inputs/interfaces";
export declare class AdminUserRepository extends TypeOrmRepository<AdminUser> {
    constructor(repository: Repository<AdminUser>);
    updateRoleForUser({ user_id, role, added_by_user_id }: IAddAdminUserInput): Promise<import("typeorm").UpdateResult>;
    removeAdminUser(user_id: number): Promise<import("typeorm").DeleteResult>;
}
//# sourceMappingURL=admin-user.repository.d.ts.map