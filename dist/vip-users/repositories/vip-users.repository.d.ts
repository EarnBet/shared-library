import { TypeOrmRepository } from "src/database/typeorm/typeorm-repository.base";
import { VipUser } from "../entities/vip-users.entity";
export declare class VipUserSharedRepository extends TypeOrmRepository<VipUser> {
    getAll(): Promise<VipUser[]>;
    remove(user_id: number): Promise<VipUser>;
}
//# sourceMappingURL=vip-users.repository.d.ts.map