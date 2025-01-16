import { Injectable } from "@nestjs/common";
import { TypeOrmRepository } from "src/database/typeorm/typeorm-repository.base";
import { VipUser } from "../entities/vip-users.entity";

@Injectable()
export class VipUserRepository extends TypeOrmRepository<VipUser> {}
