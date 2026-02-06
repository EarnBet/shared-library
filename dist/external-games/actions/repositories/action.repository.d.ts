import { Repository } from "typeorm";
import { TypeOrmRepository } from "../../../database/typeorm/typeorm-repository.base";
import { ExternalGameAction } from "../entities/action.entity";
export declare class ExternalGameActionRepository extends TypeOrmRepository<ExternalGameAction> {
    constructor(repository: Repository<ExternalGameAction>);
    shouldActionBeProcessed(action_id: string): Promise<boolean>;
    getActionsByIds(actionIds: string[]): Promise<ExternalGameAction[]>;
    markActionsAsRolledBack(actionIds: string[]): Promise<import("typeorm").UpdateResult>;
    getRecentActions(): Promise<ExternalGameAction[]>;
    getRecentActionsForUser(user_id: number): Promise<ExternalGameAction[]>;
}
//# sourceMappingURL=action.repository.d.ts.map