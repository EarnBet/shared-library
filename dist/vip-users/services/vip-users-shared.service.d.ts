import { VipUserSharedRepository } from "../repositories/vip-users.repository";
export declare class VipUsersSharedService {
    private vipUsersRep;
    constructor(vipUsersRep: VipUserSharedRepository);
    addUser(user_id: number): Promise<number>;
    removeUser(user_id: number): Promise<import("../..").VipUser>;
    isExist(user_id: number): Promise<boolean>;
}
//# sourceMappingURL=vip-users-shared.service.d.ts.map