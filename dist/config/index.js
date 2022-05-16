"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseBooleanFromEnv = void 0;
function parseBooleanFromEnv(VARIABLE_NAME) {
    return process.env[VARIABLE_NAME] === "true";
}
exports.parseBooleanFromEnv = parseBooleanFromEnv;
//# sourceMappingURL=index.js.map