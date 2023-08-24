import { Repository, InsertResult, DeepPartial, FindConditions } from "typeorm";
import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";

export abstract class TypeOrmRepository<Entity> {
  constructor(protected readonly repository: Repository<Entity>) {}

  async insertOne(entity: QueryDeepPartialEntity<Entity>): Promise<number> {
    const result: InsertResult = await this.repository.insert(entity);

    let id = result.raw.insertId || result.identifiers[0].id;

    return id;
  }

  insert(
    items: QueryDeepPartialEntity<Entity> | QueryDeepPartialEntity<Entity>[]
  ) {
    return this.repository.insert(items);
  }

  save(item: DeepPartial<Entity>) {
    return this.repository.save(item);
  }

  deleteAll() {
    return this.clear();
  }
  clear() {
    return this.repository.clear();
  }

  findOne(item: FindConditions<Entity>): Promise<Entity | undefined> {
    return this.repository.findOne({ where: { ...item } });
  }

  findOneById(id: string | number): Promise<Entity | undefined> {
    return this.repository.findOne(id);
  }

  find(item: FindConditions<Entity>): Promise<Entity[]> {
    return this.repository.find({ where: { ...item } });
  }

  findAll(): Promise<Entity[]> {
    return this.repository.find();
  }
}
