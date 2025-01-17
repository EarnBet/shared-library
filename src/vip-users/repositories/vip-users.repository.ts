import { Injectable } from "@nestjs/common";
import { TypeOrmRepository } from "../../database/typeorm/typeorm-repository.base";
import { VipUser } from "../entities/vip-users.entity";
import { Not, Equal } from "typeorm";

@Injectable()
export class VipUserSharedRepository extends TypeOrmRepository<VipUser> {
  getAll(): Promise<VipUser[]> {
    console.log(this.repository);
    return this.repository.find();
  }

  async remove(user_id: number): Promise<VipUser> {
    const vip_user = await this.findOne({ user_id });

    return this.repository.remove(vip_user);
  }
}
