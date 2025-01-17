import { Injectable } from "@nestjs/common";
import { TypeOrmRepository } from "src/database/typeorm/typeorm-repository.base";
import { VipUser } from "../entities/vip-users.entity";

@Injectable()
export class VipUserSharedRepository extends TypeOrmRepository<VipUser> {
  getAll(): Promise<VipUser[]> {
    return this.findAll();
  }

  async remove(user_id: number): Promise<VipUser> {
    const vip_user = await this.findOne({ user_id });

    return this.repository.remove(vip_user);
  }
}
