import emojiRegex from "emoji-regex";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Raw, Repository } from "typeorm";
import { UsernameBannedWord } from "../entities/username-banned-words.entity";
import { TypeOrmRepository } from "../../database/typeorm/typeorm-repository.base";
import { SharedDatabaseConnectionName } from "../../database/constants";

@Injectable()
export class UsernameBannedWordRepository extends TypeOrmRepository<UsernameBannedWord> {
  constructor(
    @InjectRepository(UsernameBannedWord, SharedDatabaseConnectionName.EARNBET)
    repository: Repository<UsernameBannedWord>
  ) {
    super(repository);
  }

  async containsBannedWord(username: string): Promise<boolean> {
    const found = await this.repository.findOne({
      where: {
        word: Raw((alias) => `LOCATE(LOWER(${alias}),:name)`, {
          name: username.replace(emojiRegex(), "").toLowerCase(),
        }),
      },
    });

    return found ? true : false;
  }
}
