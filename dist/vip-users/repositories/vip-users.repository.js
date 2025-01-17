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
exports.VipUserSharedRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_repository_base_1 = require("../../database/typeorm/typeorm-repository.base");
const vip_users_entity_1 = require("../entities/vip-users.entity");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const constants_1 = require("../../database/constants");
let VipUserSharedRepository = class VipUserSharedRepository extends typeorm_repository_base_1.TypeOrmRepository {
    constructor(repository) {
        super(repository);
    }
    getAll() {
        return this.repository.find();
    }
    async remove(user_id) {
        const vip_user = await this.findOne({ user_id });
        return this.repository.remove(vip_user);
    }
};
exports.VipUserSharedRepository = VipUserSharedRepository;
exports.VipUserSharedRepository = VipUserSharedRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(vip_users_entity_1.VipUser, constants_1.SharedDatabaseConnectionName.EARNBET)),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], VipUserSharedRepository);
//# sourceMappingURL=vip-users.repository.js.map