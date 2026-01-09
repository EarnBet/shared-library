import { Module } from "@nestjs/common";

import { TypeOrmModule } from "@nestjs/typeorm";

import { SharedDatabaseConnectionName } from "../database/constants";
import { EarnbetDatabaseConnectionModule } from "../database/earnbet-connection.module";

import { UserRepository } from "./repositories/user.repository";
import { User } from "./entities/user.entity";
import { UsernameBannedWord } from "./entities/username-banned-words.entity";
import { UsernameBannedWordRepository } from "./repositories/username-banned-word.repository";
import { SharedDatabaseConnectionName } from "../database/constants";
import { EarnbetDatabaseConnectionModule } from "../database/earnbet-connection.module";

@Module({
  imports: [
    EarnbetDatabaseConnectionModule,

    TypeOrmModule.forFeature(
      [User, UsernameBannedWord],
      SharedDatabaseConnectionName.EARNBET
    ),
  ],
  providers: [UserRepository, UsernameBannedWordRepository],
  exports: [UserRepository, UsernameBannedWordRepository],
})
export class UsersDatabaseModule {}
