"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SharedConfigModule = void 0;
const path = __importStar(require("path"));
const fs = __importStar(require("fs"));
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
exports.SharedConfigModule = SharedConfigModule;
exports.SharedConfigModule = SharedConfigModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true, envFilePath: getEnvFilePath() }),
        ],
        providers: [shared_config_service_1.SharedConfigService],
        exports: [shared_config_service_1.SharedConfigService],
    }),
    __metadata("design:paramtypes", [shared_config_service_1.SharedConfigService])
], SharedConfigModule);
//# sourceMappingURL=shared-config.module.js.map