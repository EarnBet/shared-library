"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var CurrencyAmountModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CurrencyAmountModule = void 0;
const common_1 = require("@nestjs/common");
const coins_module_1 = require("../coins/coins.module");
const currency_amount_service_1 = require("./services/currency-amount.service");
let CurrencyAmountModule = CurrencyAmountModule_1 = class CurrencyAmountModule {
    static forRoot(envFileRelativePath = ".env") {
        return {
            module: CurrencyAmountModule_1,
            imports: [coins_module_1.SharedCoinsModule.forRoot(envFileRelativePath)],
            providers: [currency_amount_service_1.CurrencyAmountService],
            exports: [currency_amount_service_1.CurrencyAmountService, coins_module_1.SharedCoinsModule],
        };
    }
};
CurrencyAmountModule = CurrencyAmountModule_1 = __decorate([
    (0, common_1.Module)({})
], CurrencyAmountModule);
exports.CurrencyAmountModule = CurrencyAmountModule;
//# sourceMappingURL=currency-amount.module.js.map