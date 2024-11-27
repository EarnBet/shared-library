import { Repository, InsertResult, DeepPartial, FindOptionsWhere } from "typeorm";
import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";
export declare abstract class TypeOrmRepository<Entity> {
    readonly repository: Repository<Entity>;
    constructor(repository: Repository<Entity>);
    insertOne(entity: QueryDeepPartialEntity<Entity>): Promise<number>;
    insert(items: QueryDeepPartialEntity<Entity> | QueryDeepPartialEntity<Entity>[]): Promise<InsertResult>;
    save(item: DeepPartial<Entity>): Promise<DeepPartial<Entity> & Entity>;
    deleteAll(): Promise<void>;
    clear(): Promise<void>;
    findOne(item: FindOptionsWhere<Entity>): Promise<Entity | undefined>;
    findOneById(id: string | number): Promise<Entity | undefined>;
    find(item: FindOptionsWhere<Entity>): Promise<Entity[]>;
    findFirstOne(): Promise<Entity>;
    findAll(): Promise<Entity[]>;
}
//# sourceMappingURL=typeorm-repository.base.d.ts.map