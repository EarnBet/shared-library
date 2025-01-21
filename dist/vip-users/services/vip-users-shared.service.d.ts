import { VipUserSharedRepository } from "../repositories/vip-users.repository";
import { VipMode } from "../entities/vip-users.entity";
export declare class VipUsersSharedService {
    private vipUsersRep;
    constructor(vipUsersRep: VipUserSharedRepository);
    addUser(user_id: number): Promise<number>;
    removeUser(user_id: number): Promise<import("../entities/vip-users.entity").VipUser>;
    changeMode(user_id: number, mode: VipMode): Promise<import("../entities/vip-users.entity").VipUser>;
    isVip(user_id: number): Promise<boolean>;
    getVip(user_id: number): Promise<import("../entities/vip-users.entity").VipUser>;
}
//# sourceMappingURL=vip-users-shared.service.d.ts.map