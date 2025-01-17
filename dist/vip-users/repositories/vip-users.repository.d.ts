import { TypeOrmRepository } from "../../database/typeorm/typeorm-repository.base";
import { VipUser } from "../entities/vip-users.entity";
import { Repository } from "typeorm";
export declare class VipUserSharedRepository extends TypeOrmRepository<VipUser> {
    constructor(repository: Repository<VipUser>);
    getAll(): Promise<VipUser[]>;
    remove(user_id: number): Promise<VipUser>;
}
//# sourceMappingURL=vip-users.repository.d.ts.map