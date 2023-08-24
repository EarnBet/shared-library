"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeOrmRepository = void 0;
class TypeOrmRepository {
    constructor(repository) {
        this.repository = repository;
    }
    async insertOne(entity) {
        const result = await this.repository.insert(entity);
        let id = result.raw.insertId || result.identifiers[0].id;
        return id;
    }
    insert(items) {
        return this.repository.insert(items);
    }
    save(item) {
        return this.repository.save(item);
    }
    deleteAll() {
        return this.clear();
    }
    clear() {
        return this.repository.clear();
    }
    findOne(item) {
        return this.repository.findOne({ where: Object.assign({}, item) });
    }
    findOneById(id) {
        return this.repository.findOne(id);
    }
    find(item) {
        return this.repository.find({ where: Object.assign({}, item) });
    }
    findAll() {
        return this.repository.find();
    }
}
exports.TypeOrmRepository = TypeOrmRepository;
//# sourceMappingURL=typeorm-repository.base.js.map