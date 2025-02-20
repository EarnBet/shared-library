"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsValidUsernameFormat = void 0;
const common_1 = require("@nestjs/common");
const class_validator_1 = require("class-validator");
const decorators_1 = require("../../validation/decorators");
function IsValidUsernameFormat() {
    return (0, common_1.applyDecorators)((0, class_validator_1.IsString)(), (0, decorators_1.Trim)(), (0, class_validator_1.MinLength)(4));
}
exports.IsValidUsernameFormat = IsValidUsernameFormat;
//# sourceMappingURL=decorators.js.map