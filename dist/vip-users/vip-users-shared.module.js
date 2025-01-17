"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SharedVipUsersModule = void 0;
const common_1 = require("@nestjs/common");
const vip_users_database_module_1 = require("./vip-users-database.module");
const vip_users_shared_service_1 = require("./services/vip-users-shared.service");
let SharedVipUsersModule = class SharedVipUsersModule {
};
exports.SharedVipUsersModule = SharedVipUsersModule;
exports.SharedVipUsersModule = SharedVipUsersModule = __decorate([
    (0, common_1.Module)({
        imports: [vip_users_database_module_1.VipUsersDatabaseModule],
        providers: [vip_users_shared_service_1.VipUsersSharedService],
        exports: [vip_users_shared_service_1.VipUsersSharedService, vip_users_database_module_1.VipUsersDatabaseModule],
    })
], SharedVipUsersModule);
//# sourceMappingURL=vip-users-shared.module.js.map