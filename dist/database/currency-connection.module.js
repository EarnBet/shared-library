"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CurrencyDatabaseConnectionModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const shared_config_module_1 = require("../config/shared-config.module");
const constants_1 = require("./constants");
const functions_1 = require("./functions");
let CurrencyDatabaseConnectionModule = class CurrencyDatabaseConnectionModule {
};
exports.CurrencyDatabaseConnectionModule = CurrencyDatabaseConnectionModule;
exports.CurrencyDatabaseConnectionModule = CurrencyDatabaseConnectionModule = __decorate([
    (0, common_1.Module)({
        imports: [
            shared_config_module_1.SharedConfigModule,
            typeorm_1.TypeOrmModule.forRoot(Object.assign({}, (0, functions_1.getTypeOrmConnectionConfig)(constants_1.SharedDatabaseConnectionName.CURRENCY))),
        ],
        exports: [shared_config_module_1.SharedConfigModule, typeorm_1.TypeOrmModule],
    })
], CurrencyDatabaseConnectionModule);
//# sourceMappingURL=currency-connection.module.js.map