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
exports.SharedConfigModule = void 0;
const path = require("path");
const fs = require("fs");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const shared_config_service_1 = require("./shared-config.service");
function getEnvFilePath(envFileRelativePath = ".env") {
    if (envFileRelativePath == ".env" && process.env.NODE_ENV !== undefined) {
        envFileRelativePath = process.env.NODE_ENV + ".env";
    }
    const envFilePath = path.resolve(process.cwd(), envFileRelativePath);
    console.log({
        NODE_ENV: process.env.NODE_ENV,
        envFileRelativePath,
        envFilePath,
    });
    const doesFileExist = fs.existsSync(envFilePath);
    if (!doesFileExist) {
        throw new Error(".env file for config does not exist: " + envFilePath);
    }
    return envFilePath;
}
let SharedConfigModule = class SharedConfigModule {
    constructor(service) {
        const shouldUseRealCurrencyPriceService = service.shouldUseRealCurrencyPriceService();
        console.log({ shouldUseRealCurrencyPriceService });
    }
};
SharedConfigModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true, envFilePath: getEnvFilePath() }),
        ],
        providers: [shared_config_service_1.SharedConfigService],
        exports: [shared_config_service_1.SharedConfigService],
    }),
    __metadata("design:paramtypes", [shared_config_service_1.SharedConfigService])
], SharedConfigModule);
exports.SharedConfigModule = SharedConfigModule;
//# sourceMappingURL=shared-config.module.js.map