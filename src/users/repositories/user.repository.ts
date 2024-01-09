import { InjectRepository } from "@nestjs/typeorm";
import { Injectable } from "@nestjs/common";

import { In, Raw, Repository } from "typeorm";

import { TypeOrmRepository } from "../../database/typeorm/typeorm-repository.base";
import { SharedDatabaseConnectionName } from "../../database/constants";
import { NOW } from "../../database/typeorm/typeorm-expressions";

import { escapeStringInput } from "../../database/functions";

import { User } from "../entities/user.entity";
import {
  IChangePasswordInput,
  IRegisterInput,
  ISaveNewEmailInput,
} from "../services/inputs";

import { IMarkEmailAsVerifiedInput, IUpdateProfileInput } from "./inputs";
import { whereClauseForSimilarUsername } from "./functions";

@Injectable()
export class UserRepository extends TypeOrmRepository<User> {
  constructor(
    @InjectRepository(User, SharedDatabaseConnectionName.EARNBET)
    repository: Repository<User>
  ) {
    super(repository);
  }

  register(input: IRegisterInput) {
    return this.repository.save(input);
  }

  // case-insensitive comparison with emojis ignored
  findBySimilarUsername(username: string) {
    return this.repository.findOne({
      where: whereClauseForSimilarUsername({
        columnName: "username",
        username,
      }),
    });
  }

  findByExactUsername(username: string) {
    return this.repository.findOne({ where: { username } });
  }

  findById(id: number) {
    return this.findOne({ id });
  }

  findByIds(userIds: number[]) {
    return this.find({ id: In(userIds) });
  }

  searchUsernames(query: string) {
    // make sure string is safe from sql injection
    const escapedString = escapeStringInput(query);
    query = escapedString.substring(1, escapedString.length - 1);

    return this.find({
      username: Raw((alias) => `${alias} LIKE '${query}%'`),
    });
  }

  findByEmail(email: string) {
    return this.repository.findOne({ where: { email } });
  }

  markEmailAsVerified(input: IMarkEmailAsVerifiedInput) {
    return this.repository.update(input.user_id, {
      email_verified_at: NOW,
      ip: input.ip,
    });
  }

  saveNewEmail(input: ISaveNewEmailInput) {
    return this.repository.update(input.user_id, {
      email: input.new_email,
      email_verified_at: null,
      updated_at: NOW,
      ip: input.ip,
    });
  }

  changePassword(input: IChangePasswordInput) {
    return this.repository.update(input.user_id, {
      password: input.password,
      updated_at: NOW,
      ip: input.ip,
    });
  }

  updateProfile(input: IUpdateProfileInput) {
    return this.repository.update(input.user_id, {
      gender: input.gender,
      country: input.country,

      updated_at: NOW,
      ip: input.ip,
    });
  }

  updateUserIp(id: number, ip: string) {
    return this.repository.update({ id }, { ip });
  }
}
