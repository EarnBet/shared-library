import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Not, Repository } from "typeorm";

import { TypeOrmRepository } from "../../database/typeorm/typeorm-repository.base";
import { SharedDatabaseConnectionName } from "../../database/constants";

import { AdminUser } from "../entities/admin-user.entity";
import { IAddAdminUserInput } from "../inputs/interfaces";

@Injectable()
export class AdminUserRepository extends TypeOrmRepository<AdminUser> {
  constructor(
    @InjectRepository(AdminUser, SharedDatabaseConnectionName.EARNBET)
    repository: Repository<AdminUser>
  ) {
    super(repository);
  }

  updateRoleForUser({ user_id, role, added_by_user_id }: IAddAdminUserInput) {
    return this.repository.update(
      { user_id, role: Not(role) },
      { role, added_by_user_id }
    );
  }

  removeAdminUser(user_id: number) {
    return this.repository.delete(user_id);
  }
}
