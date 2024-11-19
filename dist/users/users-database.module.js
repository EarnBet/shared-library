"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersDatabaseModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_repository_1 = require("./repositories/user.repository");
const user_entity_1 = require("./entities/user.entity");
const username_banned_words_entity_1 = require("./entities/username-banned-words.entity");
const username_banned_word_repository_1 = require("./repositories/username-banned-word.repository");
const constants_1 = require("../database/constants");
const db_connections_module_1 = require("../database/db-connections.module");
let UsersDatabaseModule = class UsersDatabaseModule {
};
exports.UsersDatabaseModule = UsersDatabaseModule;
exports.UsersDatabaseModule = UsersDatabaseModule = __decorate([
    (0, common_1.Module)({
        imports: [
            db_connections_module_1.SharedDatabaseConnectionsModule,
            typeorm_1.TypeOrmModule.forFeature([user_entity_1.User, username_banned_words_entity_1.UsernameBannedWord], constants_1.SharedDatabaseConnectionName.EARNBET),
        ],
        providers: [user_repository_1.UserRepository, username_banned_word_repository_1.UsernameBannedWordRepository],
        exports: [user_repository_1.UserRepository, username_banned_word_repository_1.UsernameBannedWordRepository],
    })
], UsersDatabaseModule);
//# sourceMappingURL=users-database.module.js.map