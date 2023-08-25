"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SharedDatabaseConnectionsModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const shared_config_module_1 = require("../config/shared-config.module");
const constants_1 = require("./constants");
const functions_1 = require("./functions");
let SharedDatabaseConnectionsModule = class SharedDatabaseConnectionsModule {
};
SharedDatabaseConnectionsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            shared_config_module_1.SharedConfigModule,
            typeorm_1.TypeOrmModule.forRoot(Object.assign(Object.assign({}, (0, functions_1.getTypeOrmConnectionConfig)(constants_1.SharedDatabaseConnectionName.CURRENCY)), { poolSize: 2 })),
        ],
        exports: [shared_config_module_1.SharedConfigModule, typeorm_1.TypeOrmModule],
    })
], SharedDatabaseConnectionsModule);
exports.SharedDatabaseConnectionsModule = SharedDatabaseConnectionsModule;
//# sourceMappingURL=db-connections.module.js.map