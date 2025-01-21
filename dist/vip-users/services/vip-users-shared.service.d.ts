import { VipUserSharedRepository } from "../repositories/vip-users.repository";
export declare class VipUsersSharedService {
    private vipUsersRep;
    constructor(vipUsersRep: VipUserSharedRepository);
    addUser(user_id: number): Promise<number>;
    removeUser(user_id: number): Promise<import("../..").VipUser>;
    isVip(user_id: number): Promise<boolean>;
    getVip(user_id: number): Promise<import("../..").VipUser>;
}
//# sourceMappingURL=vip-users-shared.service.d.ts.map