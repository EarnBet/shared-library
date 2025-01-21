import { TypeOrmRepository } from "../../database/typeorm/typeorm-repository.base";
import { VipMode, VipUser } from "../entities/vip-users.entity";
import { Repository } from "typeorm";
export declare class VipUserSharedRepository extends TypeOrmRepository<VipUser> {
    constructor(repository: Repository<VipUser>);
    getAll(): Promise<VipUser[]>;
    remove(user_id: number): Promise<VipUser>;
    changeMode(user_id: number, mode: VipMode): Promise<VipUser>;
}
//# sourceMappingURL=vip-users.repository.d.ts.map