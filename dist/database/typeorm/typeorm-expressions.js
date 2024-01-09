"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NOW = exports.IsNotNull = void 0;
const typeorm_1 = require("typeorm");
function IsNotNull() {
    return (0, typeorm_1.Not)((0, typeorm_1.IsNull)());
}
exports.IsNotNull = IsNotNull;
const NOW = () => "NOW()";
exports.NOW = NOW;
//# sourceMappingURL=typeorm-expressions.js.map