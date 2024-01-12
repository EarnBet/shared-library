"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Trim = exports.IsValidEmailFormat = void 0;
const common_1 = require("@nestjs/common");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const transform_functions_1 = require("./transform.functions");
function IsValidEmailFormat() {
    return (0, common_1.applyDecorators)((0, class_validator_1.IsString)(), (0, class_transformer_1.Transform)(transform_functions_1.emailTransform), (0, class_validator_1.IsEmail)());
}
exports.IsValidEmailFormat = IsValidEmailFormat;
function Trim() {
    return (0, class_transformer_1.Transform)(transform_functions_1.trimTransform);
}
exports.Trim = Trim;
//# sourceMappingURL=decorators.js.map