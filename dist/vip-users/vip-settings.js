"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VipSettings = void 0;
const big_js_1 = __importDefault(require("big.js"));
class VipSettings {
    static minimumBetToTokens(token_price, precision) {
        return new big_js_1.default(VipSettings.minimumBetAmountUsd)
            .div(token_price)
            .round(precision, big_js_1.default.roundDown)
            .toNumber();
    }
}
exports.VipSettings = VipSettings;
VipSettings.depositBonusPercentage = 20;
VipSettings.rakeback = 62.5;
VipSettings.minimumWagerAmountToBecomeVip = 1000000;
VipSettings.minimumBetAmountUsd = 100;
//# sourceMappingURL=vip-settings.js.map