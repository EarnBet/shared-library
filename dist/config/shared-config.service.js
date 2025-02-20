"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SharedConfigService = void 0;
const common_1 = require("@nestjs/common");
const _1 = require(".");
const DEFAULT_COIN_PRICE_UPDATE_INTERVAL = 1000 * 60 * 60;
let SharedConfigService = class SharedConfigService {
    shouldUseRealCurrencyPriceService() {
        return (0, _1.parseBooleanFromEnv)("USE_REAL_CURRENCY_PRICE_SERVICE");
    }
    coinPriceUpdateInterval() {
        return (parseInt(process.env["COIN_PRICE_UPDATE_INTERVAL"], 0) ||
            DEFAULT_COIN_PRICE_UPDATE_INTERVAL);
    }
};
exports.SharedConfigService = SharedConfigService;
exports.SharedConfigService = SharedConfigService = __decorate([
    (0, common_1.Injectable)()
], SharedConfigService);
//# sourceMappingURL=shared-config.service.js.map