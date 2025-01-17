"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VipUserSharedRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_repository_base_1 = require("../../database/typeorm/typeorm-repository.base");
let VipUserSharedRepository = class VipUserSharedRepository extends typeorm_repository_base_1.TypeOrmRepository {
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
    (0, common_1.Injectable)()
], VipUserSharedRepository);
//# sourceMappingURL=vip-users.repository.js.map