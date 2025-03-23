import { InjectRepository } from "@nestjs/typeorm";
import { Injectable } from "@nestjs/common";
import { Equal, In, Not, Repository } from "typeorm";

import { TypeOrmRepository } from "../../../database/typeorm/typeorm-repository.base";
import { ExternalGameAction } from "../entities/action.entity";
import { PlayRequestActionType } from "../entities/constants";
import { SharedDatabaseConnectionName } from "../../../database/constants";

@Injectable()
export class ExternalGameActionRepository extends TypeOrmRepository<ExternalGameAction> {
  constructor(
    @InjectRepository(
      ExternalGameAction,
      SharedDatabaseConnectionName.SOFTSWISS
    )
    repository: Repository<ExternalGameAction>
  ) {
    super(repository);
  }

  async shouldActionBeProcessed(action_id: string): Promise<boolean> {
    const action = await this.repository.findOne({
      // find by action id OR original action id
      where: [{ action_id }, { original_action_id: action_id }],
    });

    return action ? false : true;
  }

  async getActionsByIds(actionIds: string[]) {
    return await this.find({ action_id: In(actionIds) });
  }

  async markActionsAsRolledBack(actionIds: string[]) {
    return await this.repository.update(
      { action_id: In(actionIds) },
      { rolled_back_at: () => "NOW()" }
    );
  }

  async getRecentActions() {
    return await this.repository.find({
      where: { type: Not(Equal(PlayRequestActionType.ROLLBACK)) },
      order: {
        id: "DESC",
      },
      skip: 0,
      take: 1000,
    });
  }

  getRecentActionsForUser(user_id: number) {
    return this.repository
      .createQueryBuilder("action")
      .innerJoinAndSelect("action.group", "group")
      .where("group.user_id = :user_id", { user_id })
      .andWhere("action.amount_decimal IS NOT NULL")
      .orderBy("action.id", "DESC")
      .limit(1000)
      .getMany();
  }
}
