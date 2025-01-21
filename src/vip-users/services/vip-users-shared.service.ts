import { Injectable } from "@nestjs/common";
import { VipUserSharedRepository } from "../repositories/vip-users.repository";
import { VipMode } from "../entities/vip-users.entity";

@Injectable()
export class VipUsersSharedService {
  constructor(private vipUsersRep: VipUserSharedRepository) {}

  async addUser(user_id: number) {
    if (!(await this.isVip(user_id))) {
      return await this.vipUsersRep.insertOne({
        user_id,
      });
    }
  }

  async removeUser(user_id: number) {
    if (await this.isVip(user_id)) {
      return this.vipUsersRep.remove(user_id);
    }
  }

  async changeMode(user_id: number, mode: VipMode) {
    if (await this.isVip(user_id)) {
      return this.vipUsersRep.changeMode(user_id, mode);
    }
  }

  async isVip(user_id: number) {
    const result = await this.vipUsersRep.findOne({
      user_id,
    });
    if (result) {
      return true;
    } else {
      return false;
    }
  }

  getVip(user_id: number) {
    return this.vipUsersRep.findOne({
      user_id,
    });
  }
}
