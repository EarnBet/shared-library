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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const typeorm_1 = require("@nestjs/typeorm");
const common_1 = require("@nestjs/common");
const typeorm_2 = require("typeorm");
const typeorm_repository_base_1 = require("../../database/typeorm/typeorm-repository.base");
const constants_1 = require("../../database/constants");
const typeorm_expressions_1 = require("../../database/typeorm/typeorm-expressions");
const functions_1 = require("../../database/functions");
const user_entity_1 = require("../entities/user.entity");
const functions_2 = require("./functions");
let UserRepository = class UserRepository extends typeorm_repository_base_1.TypeOrmRepository {
    constructor(repository) {
        super(repository);
    }
    register(input) {
        return this.repository.save(input);
    }
    findBySimilarUsername(username) {
        return this.repository.findOne({
            where: (0, functions_2.whereClauseForSimilarUsername)({
                columnName: "username",
                username,
            }),
        });
    }
    findByExactUsername(username) {
        return this.repository.findOne({ where: { username } });
    }
    findById(id) {
        return this.findOne({ id });
    }
    findByIds(userIds) {
        return this.find({ id: (0, typeorm_2.In)(userIds) });
    }
    searchUsernames(query) {
        const escapedString = (0, functions_1.escapeStringInput)(query);
        query = escapedString.substring(1, escapedString.length - 1);
        return this.find({
            username: (0, typeorm_2.Raw)((alias) => `${alias} LIKE '${query}%'`),
        });
    }
    findByEmail(email) {
        return this.repository.findOne({ where: { email } });
    }
    markEmailAsVerified(input) {
        return this.repository.update(input.user_id, {
            email_verified_at: typeorm_expressions_1.NOW,
            ip: input.ip,
        });
    }
    saveNewEmail(input) {
        return this.repository.update(input.user_id, {
            email: input.new_email,
            email_verified_at: null,
            updated_at: typeorm_expressions_1.NOW,
            ip: input.ip,
        });
    }
    changePassword(input) {
        return this.repository.update(input.user_id, {
            password: input.password,
            updated_at: typeorm_expressions_1.NOW,
            ip: input.ip,
        });
    }
    updateProfile(input) {
        return this.repository.update(input.user_id, {
            gender: input.gender,
            country: input.country,
            updated_at: typeorm_expressions_1.NOW,
            ip: input.ip,
        });
    }
    updateUserIp(id, ip) {
        return this.repository.update({ id }, { ip });
    }
};
exports.UserRepository = UserRepository;
exports.UserRepository = UserRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User, constants_1.SharedDatabaseConnectionName.EARNBET)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UserRepository);
//# sourceMappingURL=user.repository.js.map