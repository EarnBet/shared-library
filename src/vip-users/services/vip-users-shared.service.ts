import { Injectable } from "@nestjs/common";
import { VipUserSharedRepository } from "../repositories/vip-users.repository";

@Injectable()
export class VipUsersSharedService {
  constructor(private vipUsersRep: VipUserSharedRepository) {}

  async addUser(user_id: number) {
    return await this.vipUsersRep.insertOne({
      user_id,
    });
  }

  async removeUser(user_id: number) {
    return this.vipUsersRep.remove(user_id);
  }

  async isExist(user_id: number) {
    const result = await this.vipUsersRep.findOne({
      user_id,
    });
    if (result) {
      return true;
    } else {
      return false;
    }
  }
}
