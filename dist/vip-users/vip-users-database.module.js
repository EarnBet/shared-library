"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VipUsersDatabaseModule = void 0;
const common_1 = require("@nestjs/common");
const db_connections_module_1 = require("../database/db-connections.module");
const vip_users_entity_1 = require("./entities/vip-users.entity");
const constants_1 = require("../database/constants");
const vip_users_repository_1 = require("./repositories/vip-users.repository");
const typeorm_1 = require("@nestjs/typeorm");
let VipUsersDatabaseModule = class VipUsersDatabaseModule {
};
exports.VipUsersDatabaseModule = VipUsersDatabaseModule;
exports.VipUsersDatabaseModule = VipUsersDatabaseModule = __decorate([
    (0, common_1.Module)({
        imports: [
            db_connections_module_1.SharedDatabaseConnectionsModule,
            typeorm_1.TypeOrmModule.forFeature([vip_users_entity_1.VipUser], constants_1.SharedDatabaseConnectionName.EARNBET),
        ],
        providers: [vip_users_repository_1.VipUserSharedRepository],
        exports: [vip_users_repository_1.VipUserSharedRepository],
    })
], VipUsersDatabaseModule);
//# sourceMappingURL=vip-users-database.module.js.map