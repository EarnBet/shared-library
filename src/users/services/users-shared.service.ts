import { Injectable } from "@nestjs/common";

import { bcryptCheckPass } from "../../crypto/bcrypt.functions";
import { generateAuthToken } from "../../auth/util/auth.functions";

import { UserRepository } from "../repositories/user.repository";
import { UsernameBannedWordRepository } from "../repositories/username-banned-word.repository";
import { ILoginInput, ILoginUserInput } from "./inputs";
import { User } from "../entities/user.entity";

@Injectable()
export class SharedUsersService {
  constructor(
    private users: UserRepository,
    private bannedWords: UsernameBannedWordRepository
  ) {}

  async login(input: ILoginInput) {
    // correct password validation is being done at input layer
    const user = await this.findByExactUsername(input.username);

    await this.users.updateUserIp(user.id, input.ip);

    const token = generateAuthToken(user);

    return { id: user.id, username: user.username, email: user.email, token };
  }

  async isUsernameTaken(username: string) {
    const user = await this.findBySimilarUsername(username);

    return user != null;
  }

  private findBySimilarUsername(username: string) {
    return this.users.findBySimilarUsername(username);
  }

  private async isEmailInUse(email: string) {
    const user = await this.findByEmail(email);

    return user != null;
  }

  usernameContainsBannedWord(username: string) {
    return this.bannedWords.containsBannedWord(username);
  }

  async isValidLogin(input: ILoginUserInput) {
    const user = await this.findByExactUsername(input.username);

    return this.isValidPasswordForUser(input.password, user);
  }

  async isValidPassword(password: string, userId: number) {
    return this.isValidPasswordForUser(
      password,
      await this.getUserById(userId)
    );
  }

  private async isValidPasswordForUser(password: string, user: User) {
    let isPasswordValid = false;

    if (user) {
      isPasswordValid = await bcryptCheckPass(password, user.password);
    }

    return {
      // returning the user record saves us from having to do an extra DB query
      user,
      isPasswordValid,
    };
  }

  findByExactUsername(username: string) {
    return this.users.findByExactUsername(username);
  }

  findByEmail(email: string) {
    return this.users.findByEmail(email);
  }

  async isUserFound(userId: number): Promise<boolean> {
    const user = await this.getUserById(userId);

    return user != null;
  }

  async isEmailVerified(userId: number) {
    const user = await this.getUserById(userId);

    const isEmailVerified =
      user && user.email != null && user.email_verified_at != null;

    return { isEmailVerified, user };
  }

  getUserById(userId: number) {
    return this.users.findById(userId);
  }

  getUsersByIds(userIds: number[]) {
    return this.users.findByIds(userIds);
  }

  async searchUsernames(query: string) {
    const users = await this.users.searchUsernames(query);

    return users.map((user) => {
      delete user.password;
      return user;
    });
  }
}
