import { Repository } from "typeorm";
import { UsernameBannedWord } from "../entities/username-banned-words.entity";
import { TypeOrmRepository } from "../../database/typeorm/typeorm-repository.base";
export declare class UsernameBannedWordRepository extends TypeOrmRepository<UsernameBannedWord> {
    constructor(repository: Repository<UsernameBannedWord>);
    containsBannedWord(username: string): Promise<boolean>;
}
//# sourceMappingURL=username-banned-word.repository.d.ts.map