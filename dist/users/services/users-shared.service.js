"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SharedUsersService = void 0;
const common_1 = require("@nestjs/common");
const bcrypt_functions_1 = require("../../crypto/bcrypt.functions");
const auth_functions_1 = require("../../auth/util/auth.functions");
const user_repository_1 = require("../repositories/user.repository");
const username_banned_word_repository_1 = require("../repositories/username-banned-word.repository");
let SharedUsersService = class SharedUsersService {
    constructor(users, bannedWords) {
        this.users = users;
        this.bannedWords = bannedWords;
    }
    async login(input) {
        const user = await this.findByExactUsername(input.username);
        await this.users.updateUserIp(user.id, input.ip);
        const token = (0, auth_functions_1.generateAuthToken)(user);
        return { id: user.id, username: user.username, email: user.email, token };
    }
    async isUsernameTaken(username) {
        const user = await this.findBySimilarUsername(username);
        return user != null;
    }
    findBySimilarUsername(username) {
        return this.users.findBySimilarUsername(username);
    }
    async isEmailInUse(email) {
        const user = await this.findByEmail(email);
        return user != null;
    }
    usernameContainsBannedWord(username) {
        return this.bannedWords.containsBannedWord(username);
    }
    async isValidLogin(input) {
        const user = await this.findByExactUsername(input.username);
        return this.isValidPasswordForUser(input.password, user);
    }
    async isValidPassword(password, userId) {
        return this.isValidPasswordForUser(password, await this.getUserById(userId));
    }
    async isValidPasswordForUser(password, user) {
        let isPasswordValid = false;
        if (user) {
            isPasswordValid = await (0, bcrypt_functions_1.bcryptCheckPass)(password, user.password);
        }
        return {
            user,
            isPasswordValid,
        };
    }
    findByExactUsername(username) {
        return this.users.findByExactUsername(username);
    }
    findByEmail(email) {
        return this.users.findByEmail(email);
    }
    async isUserFound(userId) {
        const user = await this.getUserById(userId);
        return user != null;
    }
    async isEmailVerified(userId) {
        const user = await this.getUserById(userId);
        const isEmailVerified = user && user.email != null && user.email_verified_at != null;
        return { isEmailVerified, user };
    }
    getUserById(userId) {
        return this.users.findById(userId);
    }
    getUsersByIds(userIds) {
        return this.users.findByIds(userIds);
    }
    async searchUsernames(query) {
        const users = await this.users.searchUsernames(query);
        return users.map((user) => {
            delete user.password;
            return user;
        });
    }
};
SharedUsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_repository_1.UserRepository,
        username_banned_word_repository_1.UsernameBannedWordRepository])
], SharedUsersService);
exports.SharedUsersService = SharedUsersService;
//# sourceMappingURL=users-shared.service.js.map