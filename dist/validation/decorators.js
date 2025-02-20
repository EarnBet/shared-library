"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsValidEmailFormat = IsValidEmailFormat;
exports.Trim = Trim;
const common_1 = require("@nestjs/common");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const transform_functions_1 = require("./transform.functions");
function IsValidEmailFormat() {
    return (0, common_1.applyDecorators)((0, class_validator_1.IsString)(), (0, class_transformer_1.Transform)(transform_functions_1.emailTransform), (0, class_validator_1.IsEmail)());
}
function Trim() {
    return (0, class_transformer_1.Transform)(transform_functions_1.trimTransform);
}
//# sourceMappingURL=decorators.js.map