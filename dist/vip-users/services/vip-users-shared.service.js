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
exports.VipUsersSharedService = void 0;
const common_1 = require("@nestjs/common");
const vip_users_repository_1 = require("../repositories/vip-users.repository");
let VipUsersSharedService = class VipUsersSharedService {
    constructor(vipUsersRep) {
        this.vipUsersRep = vipUsersRep;
    }
    async addUser(user_id) {
        if (!(await this.isVip(user_id))) {
            return await this.vipUsersRep.insertOne({
                user_id,
            });
        }
    }
    async removeUser(user_id) {
        if (await this.isVip(user_id)) {
            return this.vipUsersRep.remove(user_id);
        }
    }
    async changeMode(user_id, mode) {
        if (await this.isVip(user_id)) {
            return this.vipUsersRep.changeMode(user_id, mode);
        }
    }
    async isVip(user_id) {
        const result = await this.vipUsersRep.findOne({
            user_id,
        });
        if (result) {
            return true;
        }
        else {
            return false;
        }
    }
    getVip(user_id) {
        return this.vipUsersRep.findOne({
            user_id,
        });
    }
};
exports.VipUsersSharedService = VipUsersSharedService;
exports.VipUsersSharedService = VipUsersSharedService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [vip_users_repository_1.VipUserSharedRepository])
], VipUsersSharedService);
//# sourceMappingURL=vip-users-shared.service.js.map