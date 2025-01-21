import { Injectable } from "@nestjs/common";
import { TypeOrmRepository } from "../../database/typeorm/typeorm-repository.base";
import { VipMode, VipUser } from "../entities/vip-users.entity";
import { Not, Equal, Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { SharedDatabaseConnectionName } from "../../database/constants";

@Injectable()
export class VipUserSharedRepository extends TypeOrmRepository<VipUser> {
  constructor(
    @InjectRepository(VipUser, SharedDatabaseConnectionName.EARNBET)
    repository: Repository<VipUser>
  ) {
    super(repository);
  }

  getAll(): Promise<VipUser[]> {
    return this.repository.find();
  }

  async remove(user_id: number): Promise<VipUser> {
    const vip_user = await this.findOne({ user_id });

    return this.repository.remove(vip_user);
  }

  async changeMode(user_id: number, mode: VipMode): Promise<VipUser> {
    const vip_user = await this.findOne({ user_id });
    vip_user.status = mode;
    return this.repository.save(vip_user);
  }
}
